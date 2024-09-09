import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useGiftStore = defineStore('useGiftStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)

    async function giftTreesAsync(payload){
        return await axios.value.post('/api/gift/create-gift',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        giftTreesAsync
    }
})