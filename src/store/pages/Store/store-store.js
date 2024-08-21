import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {BALANCE ,SWIFT,STRIPE} from "@/constants/buy-young-payment-type.js"


export const useStoreStore = defineStore('useStoreStore' ,()=> {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const {showInfoMassage,getUserInfo} = appStore
    const treeStore = ref([])
    const treeByYear = ref([])

    async function getTreeInStoreAsync(){
        return await axios.value.post('/api/tree-store/get-tree-store')
            .then(response => {
                treeStore.value = response.data.data
            })
            .catch(error => {});
    }
    async function getTreeInStoreByYearAsync(payload){
        return await axios.value.post('/api/tree-store/get-tree-by-year',payload)
            .then(response => {
                treeByYear.value = response.data.data
            })
            .catch(error => {});
    }

    return {
        treeStore,getTreeInStoreAsync,getTreeInStoreByYearAsync,treeByYear
    }
})