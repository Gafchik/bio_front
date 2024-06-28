import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";

export const useWithdrawalStore = defineStore('useWithdrawalStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);

    async function fillRequestWithdrawal(payload){
        return await axios.value.post('/api/withdrawals/fill-request',payload)
            .then(response => {})
            .catch(error => {});
    }

    return {
        fillRequestWithdrawal
    }
})