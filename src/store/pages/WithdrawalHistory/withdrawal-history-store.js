import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useWithdrawalHistoryStore = defineStore('useWithdrawalHistoryStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const withdrawalsHistory = ref([])

    async function getWithdrawalsHistory(){
        return await axios.value.post('/api/withdrawals-history/get')
            .then(response => {
                withdrawalsHistory.value = response.data.data
            })
            .catch(error => {});
    }

    return {
        withdrawalsHistory,getWithdrawalsHistory
    }
})