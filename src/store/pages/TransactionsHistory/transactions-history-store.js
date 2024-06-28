import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useTransactionsHistoryStore = defineStore('useTransactionsHistoryStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const transactions = ref([])
    async function getTransactionAsync(){
        return await axios.value.post('/api/transactions-history/get')
            .then(response => {
                transactions.value = response.data.data
            })
            .catch(error => {});
    }

    return {
        transactions,getTransactionAsync
    }
})