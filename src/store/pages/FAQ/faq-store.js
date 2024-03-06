import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useFaqStore = defineStore('useFaqStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)

    const faq = ref([])
    const category = computed(() => faq.value[currentLocale.value]?.category ?? [])
    async function getFaq(){
        axios.value.post('/api/faq')
            .then(response => {
                faq.value = response.data.data;
            })
            .catch(error => {});
    }
    return {getFaq,category}
})