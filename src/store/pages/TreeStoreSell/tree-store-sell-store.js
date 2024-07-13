import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";

export const useTreeStoreSellStore = defineStore('useTreeStoreSellStore' ,()=> {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const treeToSell = ref([])
    const position = ref([])
    const twoFaCod = ref(null)
    const treeInSell = ref([])
    async function getPosition(){
        return await axios.value.post('/api/tree-store-sell/get-position',{trees:treeToSell.value})
            .then(response => {
                position.value = response.data.data
            })
            .catch(error => {});
    }
    async function sellTreesAsync(){
        return await axios.value.post('/api/tree-store-sell/sell',{
            trees:treeToSell.value,
            twoFaCod: twoFaCod.value,
        })
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function removeSellTreesAsync(payload){
        return await axios.value.post('/api/tree-store-sell/remove-sell',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function getTreeInSellAsync(){
        return await axios.value.post('/api/tree-store-sell/get-tree-in-sell')
            .then(response => {
                treeInSell.value = response.data.data
            })
            .catch(error => {

            });
    }
    return {
        treeToSell,getPosition,position,sellTreesAsync,twoFaCod,getTreeInSellAsync,treeInSell,
        removeSellTreesAsync,
    }
})