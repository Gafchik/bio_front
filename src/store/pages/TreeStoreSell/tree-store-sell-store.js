import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";

export const useTreeStoreSellStore = defineStore('useTreeStoreSellStore' ,()=> {
    const treeToSell = ref([])

    return {
        treeToSell
    }
})