import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";

export const useUserMapStore = defineStore('useUserMapStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const trees = ref([])
    const fields = ref([])

    async function getTrees(){
        return await axios.value.post('/api/user-map/get')
            .then(response => {
                trees.value = response.data.data.trees
                fields.value = response.data.data.fields
            })
            .catch(error => {});
    }

    return {
        trees, fields,getTrees
    }
})