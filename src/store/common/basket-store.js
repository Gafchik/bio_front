import {defineStore, storeToRefs} from 'pinia'
import {ref,computed,watch} from "vue";
import {useAppStore} from "@/store/app-store.js";


export const useBasketStore = defineStore('useBasketStore' ,()=> {
    const BASKET = 'BASKET'
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const dialog = ref(false)
    const basket = ref(null)
    const twoFaCod = ref(null)
    async function getBasket(){
        let loadBasket = localStorage.getItem(BASKET)
        if (loadBasket) {
            loadBasket = JSON.parse(loadBasket);
        }
        return loadBasket
    }
    async function addToBasket(payload){
        getBasket()
            .then((loadBasket) => {
                if(!!loadBasket){
                    if(!loadBasket.some(tree => tree.tree_id === payload.tree_id)){
                        localStorage.setItem(BASKET, JSON.stringify([...loadBasket,payload]))
                    }
                }else{
                    localStorage.setItem(BASKET, JSON.stringify([payload]))
                }
            })

    }
    async function deleteFromBasket(item){
        getBasket()
            .then((loadBasket) => {
                if(!!loadBasket){
                    let newBasket = loadBasket.filter(tree => tree.tree_id !== item.tree_id)
                    if(!!newBasket.length){
                        localStorage.setItem(BASKET, JSON.stringify(newBasket))
                        basket.value = newBasket
                    }else{
                        clearBasket()
                    }
                }
            })
    }
    function clearBasket(){
        localStorage.removeItem(BASKET);
        basket.value = null
    }
    function openBasketDialog(){
        getBasket()
            .then((loadBasket) => {
                basket.value = loadBasket
                dialog.value = true
            })

    }
    function closeBasketDialog(){
        dialog.value = false
    }
    async function buyFromBasketAsync(payload){
        return await axios.value.post('/api/tree-store/buy-from-basket', {
            twoFaCod: twoFaCod.value,
            basket:payload
        })
            .then(response => {
                return response.data.data
            })
            .catch(error => {});
    }
    async function changeRule(id,value){
        if(!!basket){
            let newBasket = basket.value.map(i => {
                if(i.tree_id === id){
                    i.rules = value
                }
                return i

            })
            return getBasket()
                .then((loadBasket) => {
                    localStorage.setItem(BASKET, JSON.stringify(newBasket))
                    basket.value = newBasket
                    return 0
                })
        }

    }
    return {
        addToBasket,deleteFromBasket,getBasket,dialog,
        basket,openBasketDialog,closeBasketDialog,clearBasket,buyFromBasketAsync,
        changeRule,twoFaCod
    }
})