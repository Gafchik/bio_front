import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {BALANCE ,SWIFT,STRIPE} from "@/constants/buy-young-payment-type.js"
import {useI18n} from "vue-i18n";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

export const useBuyYongTreeStore = defineStore('useBuyYongTreeStore' ,()=> {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const {showInfoMassage,getUserInfo} = appStore
    const startInfo = ref({
        countTree: 0,
        price: 0,
    })
    const router = useRouter()
    const $q = useQuasar()
    const {t} = useI18n()
    async function getGetStartInfoAsync(){
        return await axios.value.post('/api/buy-yong-tree/get-start-info')
            .then(response => {
                startInfo.value.countTree = response.data.data.count
                startInfo.value.price = response.data.data.price
            })
            .catch(error => {});
    }
    async function buyAsync(payload){
        if(payload.payment === BALANCE){
            return await axios.value.post('/api/buy-yong-tree/buy-balance',payload)
                .then(response => {
                    showInfoMassage(t(`pages.buy_yong_tree.confirm.success`))
                    getUserInfo()
                })
                .catch(error => {});
        }
        if(payload.payment === SWIFT){
            return await axios.value.post('/api/buy-yong-tree/buy-swift',payload)
                .then(response => {
                    showInfoMassage(t(`pages.buy_yong_tree.confirm.success_swift`))
                    getUserInfo()
                })
                .catch(error => {});
        }
        if(payload.payment === STRIPE){
            payload.success_url = window.location.origin + router.resolve({ name: 'personal' }).href
            return await axios.value.post('/api/buy-yong-tree/buy-stripe',payload)
                .then(response => {
                    $q.platform.is.ipad
                    || $q.platform.is.ios
                    || $q.platform.is.iphone
                    || $q.platform.is.ipod
                    || $q.platform.is.safari
                        ? window.location.href = response.data.data.pay_url
                        : window.open(response.data.data.pay_url,'_blank');
                })
                .catch(error => {});
        }
    }
    return {
        startInfo,getGetStartInfoAsync,buyAsync
    }
})