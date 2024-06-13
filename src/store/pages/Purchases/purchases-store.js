import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const usePurchasesStore = defineStore('usePurchasesStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const orders = ref([])
    const orderTrees = ref([])
    const selectedOrder = ref({})
    async function getPurchases(){
        return await axios.value.post('/api/purchases/get')
            .then(response => {
                orders.value = response.data.data
            })
            .catch(error => {});
    }
    async function getOrderAsync(id){
        if (isNaN(id)) {
            return false
        }
        selectedOrder.value = orders.value.find((i) =>{
            return i.id === parseInt(id)
        })
        if(!selectedOrder.value){
            return false
        }
        return await axios.value.post('/api/purchases/get-tree-by-order',{order_id: id})
            .then(response => {
                orderTrees.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    getPurchases();
    return {
        getPurchases,orders,getOrderAsync,selectedOrder,orderTrees
    }
})