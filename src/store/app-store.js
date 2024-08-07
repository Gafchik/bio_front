import { defineStore } from 'pinia'
import {ref, computed, watch} from "vue";
import { useI18n } from 'vue-i18n';
import axiosInstance from "@/modules/axios.js";
import router from "@/routes/router.js"
import {copyToClipboard, Notify} from "quasar";
import { useCookies } from "vue3-cookies";
import ukr from "@assets/image/header/locales/ukr.png";
import locales from "@/constants/locales.js"
import AUTH_ROUTES from "@/routes/auth_routes.js"
export const useAppStore = defineStore('useAppStore', () => {
    const { cookies } = useCookies();
    const { locale,t } = useI18n();
    const currentLocale = computed(() => locale.value);
    const drawer = ref(false)
    const regDialog = ref(false)
    const loginDialog = ref(false)
    const activationCodeDialog = ref(false)
    const forgotPasswordDialog = ref(false)
    const isLoading = ref(false)
    let jwtCookies = cookies.get('jwt')
    const isLogin = ref(!!jwtCookies)
    const userInfo = ref({})
    let cookiesLang =  cookies.get('lang')
    let startLang = !!cookiesLang
        ? locales.find((i) => i.value === cookiesLang)
        : {value: 'uk', image: ukr}
    const localesModel = ref(startLang)
    locale.value = startLang.value
    const jwt = ref('')
    const google2fa = ref({})
    const jwtType = ref('')
    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
            config.headers['X-Lang-Header'] = currentLocale.value
            let jwt = cookies.get('jwt')
            if(!!jwt){
                config.headers['Authorization'] = `Bearer ${jwt}`
            }
            isLoading.value = true;
            return config;
        }, error => {
            return Promise.reject(error);
        })
        axiosInstance.interceptors.response.use(response => {
                isLoading.value = false;
                return response;
            },
            error => {
                isLoading.value = false;
                if(error.response.status === 401){
                    cookies.remove('jwt')
                    isLogin.value = false
                    router.push({ name: 'home' })
                    openLoginDialog()
                    Notify.create({
                        color: 'negative',
                        message: error.response.data.textError,
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else if (error.response) {
                    // Ошибка с ответом от сервера
                    const errorMessage = error.response.data.textError;
                    Notify.create({
                        color: 'negative',
                        message: errorMessage,
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else if (error.request) {
                    // Запрос был сделан, но нет ответа
                    Notify.create({
                        color: 'negative',
                        message: t('app.server_not_response'),
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else {
                    // Произошла ошибка настройки запроса
                    Notify.create({
                        color: 'negative',
                        message: t('app.request_error'),
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                }
                throw error;
            }
        );
        return axiosInstance
    });
    router.beforeEach((to, from, next) => {
        let isAuthRoute = AUTH_ROUTES.some(item => item.name === to.name)
        if(!isAuthRoute){
            next();
        }else{
            if(isLogin.value){
                next();
            }else{
                next({ name: 'home' });
                openLoginDialog()
            }
        }
    });
    function redirectByName(name){
        router.push({name: name})
    }
    function changeLocale (newLocale) {
        locale.value = newLocale.value
        let t = new Date();
        t.setSeconds(t.getSeconds() + 10800);
        cookies.set('lang',newLocale.value,t)
        if(isLogin.value){
            axios.value.post('/api/user/change-locale',{lang: newLocale.value})
                .then(response => {})
                .catch(error => {});
        }
    }
    function openReginDialog(){
        if(!isLogin.value){
            regDialog.value = true
        }
    }
    function openLoginDialog(){
        if(!isLogin.value){
            loginDialog.value = true
        }
    }
    function showInfoMassage(message){
        Notify.create({
            color: 'green',
            message: message,
            progress: true,
            position: 'top',
            html: true,
        });
    }
    function showErrorMassage(message){
        Notify.create({
            color: 'negative',
            message: message,
            progress: true,
            position: 'top',
            html: true,
        });
    }
    function openActivationCodeDialog(){
        if(!isLogin.value){
            activationCodeDialog.value = true
        }
    }
    function openForgotPasswordDialog(){
        if(!isLogin.value){
            forgotPasswordDialog.value = true
        }
    }
    async function getUserInfo(){
        return await axios.value.post('/api/auth/get-user-info')
            .then(response => {
                userInfo.value = response.data.data
                if(!!userInfo.value.locale){
                    localesModel.value = locales
                        .find((i) => i.value === userInfo.value.locale)
                    let t = new Date();
                    t.setSeconds(t.getSeconds() + 10800);
                    cookies.set('lang',userInfo.value.locale,t)
                }else{
                    cookies.remove('jwt')
                    isLogin.value = false
                }
            })
            .catch(error => {});
    }
    getUserInfo();
    async function login(payload){
        return await axios.value.post('/api/auth/login',payload)
            .then(response => {
                jwt.value = response.data.data.authorization.token
                jwtType.value = response.data.data.authorization.type
                userInfo.value = response.data.data.userInfo
                let t = new Date();
                t.setSeconds(t.getSeconds() + 10800);
                cookies.set('jwt',jwt.value,t)
                cookies.set('lang',userInfo.value.locale,t)
                localesModel.value = locales
                    .find((i) => i.value === userInfo.value.locale)
                isLogin.value = true
                return true
            })
            .catch(error => {});
    }
    function copyToClipboardNotify(value){
        copyToClipboard(value).then(() => {
            showInfoMassage(t('app.copySuccess'))
        })
    }
    async function checkHas2Fa(){
        return await axios.value.post('/api/auth/check-has-2-fa')
            .then(response => {
                google2fa.value = response.data.data
            })
            .catch(error => {

            });
    }
    async function logout(){
        return await axios.value.post('/api/auth/logout')
            .then(response => {
                cookies.remove('jwt')
                userInfo.value = {}
                isLogin.value = false
                redirectByName('home')
            })
            .catch(error => {
                cookies.remove('jwt')
                userInfo.value = {}
                isLogin.value = false
            });
    }
    watch(localesModel, () => {
        locale.value = localesModel.value.value
    })
    async function enable2Fa(payload){
        return await axios.value.post('/api/auth/enable-has-2-fa',payload)
            .then(response => {
                checkHas2Fa()
            })
            .catch(error => {

            });
    }
    async function disable2Fa(payload){
        return await axios.value.post('/api/auth/disable-has-2-fa',payload)
            .then(response => {
                checkHas2Fa()
            })
            .catch(error => {

            });
    }
    return {
        currentLocale,changeLocale,drawer,axios,regDialog,loginDialog,openReginDialog,
        openLoginDialog,isLoading,showInfoMassage,activationCodeDialog,openActivationCodeDialog,
        forgotPasswordDialog,openForgotPasswordDialog,login,isLogin,userInfo,localesModel,
        logout,redirectByName,getUserInfo,copyToClipboardNotify,google2fa,checkHas2Fa,enable2Fa,
        disable2Fa,showErrorMassage
    }
})