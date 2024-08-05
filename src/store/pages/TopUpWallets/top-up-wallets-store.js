import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {BALANCE ,SWIFT,STRIPE} from "@/constants/buy-young-payment-type.js"
import {useI18n} from "vue-i18n";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

export const useTopUpWalletsStore = defineStore('useTopUpWalletsStore' ,()=> {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const {showInfoMassage,getUserInfo} = appStore
    const router = useRouter()
    const $q = useQuasar()
    const {t} = useI18n()

    async function topUpWalletsAsync(payload){
        if(payload.payment === SWIFT){
            return await axios.value.post('/api/top-up-wallet/swift',payload)
                .then(response => {
                    showInfoMassage(t(`pages.top_up_wallet.confirm.success_swift`))
                    getUserInfo()
                })
                .catch(error => {});
        }
        if(payload.payment === STRIPE){
            payload.success_url = window.location.origin + router.resolve({ name: 'personal' }).href
            return await axios.value.post('/api/top-up-wallet/stripe',payload)
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
        topUpWalletsAsync
    }
})