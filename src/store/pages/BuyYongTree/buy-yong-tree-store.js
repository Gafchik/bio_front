import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {BALANCE ,SWIFT,STRIPE} from "@/constants/buy-young-payment-type.js"

export const useBuyYongTreeStore = defineStore('useBuyYongTreeStore' ,()=> {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const startInfo = ref({
        countTree: 0,
        price: 0,
    })

    async function getGetStartInfoAsync(){
        return await axios.value.post('/api/buy-yong-tree/get-start-info')
            .then(response => {
                startInfo.value.countTree = response.data.data.count
                startInfo.value.price = response.data.data.price
            })
            .catch(error => {

            });
    }
    async function buyAsync(payload){
        if(payload.payment === BALANCE){
            return await axios.value.post('/api/buy-yong-tree/buy-balance',payload)
                .then(response => {

                })
                .catch(error => {

                });
        }
        if(payload.payment === SWIFT){

        }
        if(payload.payment === STRIPE){
            return await axios.value.post('/api/buy-yong-tree/buy-stripe',payload)
                .then(response => {

                })
                .catch(error => {

                });
        }
    }
    return {
        startInfo,getGetStartInfoAsync,buyAsync
    }
})