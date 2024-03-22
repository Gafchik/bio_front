import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useBaseOnlyTextStore = defineStore('useBaseOnlyTextStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)

    const item = ref({
        ru: '',
        uk: '',
        en: '',
        ge: '',
    })
    async function getItemInfoAsync(id){
        axios.value.post('/api/base-only-text-pages/get',{id:id})
            .then(response => {
                response.data.data.forEach(obj => {
                    item.value[obj.locale] = obj.content?.replace(/\\"/g, '"');
                });
            })
            .catch(error => {});
    }

    return {
        item, getItemInfoAsync,
    }
})