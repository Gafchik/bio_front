import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import { useI18n } from 'vue-i18n';
import axiosInstance from "@/modules/axios.js";
import router from "@/routes/router.js"
import {Notify} from "quasar";

export const useAppStore = defineStore('useAppStore', () => {
    const cookies = computed(() => router.app.config.globalProperties)
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);
    const drawer = ref(false)
    const regDialog = ref(false)
    const loginDialog = ref(false)
    const isLoading = ref(false)
    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['X-Lang-Header'] = currentLocale.value
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
                if(error.response.status === 404){
                    router.push({ name: 'not_found'});
                }
                // Обработка ошибок
                if (error.response) {
                    // Ошибка с ответом от сервера
                    const errorMessage = error.response.data.textError || 'Произошла ошибка';
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
                        message: 'Нет ответа от сервера',
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                } else {
                    // Произошла ошибка настройки запроса
                    Notify.create({
                        color: 'negative',
                        message: 'Ошибка настройки запроса',
                        progress: true,
                        position: 'top',
                        html: true,
                    });
                }
                return Promise.reject(error);
            }
        );
        return axiosInstance
    });
    function changeLocale (newLocale) {
        locale.value = newLocale.value
    }
    function openReginDialog(){
        regDialog.value = true
    }
    function openLoginDialog(){
        loginDialog.value = true
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
    return {
        currentLocale,changeLocale,drawer,axios,regDialog,loginDialog,openReginDialog,
        openLoginDialog,isLoading,showInfoMassage
    }
})