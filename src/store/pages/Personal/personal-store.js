import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const usePersonalStore = defineStore('usePersonalStore',()=>{
    const appStore = useAppStore()
    const {getUserInfo} = appStore
    const {axios,currentLocale} = storeToRefs(appStore)
    const trees = ref([])
    async function getTreesAsync(){
        return await axios.value.post('/api/personal/get-trees')
            .then(response => {
                trees.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        trees,getTreesAsync
    }
})