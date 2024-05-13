import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'

export const useFaqStore = defineStore('useFaqStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale, cookies} = storeToRefs(appStore)

    const faq = ref([])
    const question = ref([])
    const category = computed(() => {
        let res = (faq.value[currentLocale.value]?.category ?? [])
        return res.sort((a,b) => a.position - b.position)
    })
    const selectedCategoryId = ref(category.value?.[0]?.faq_category_id ?? null)
    async function getFaq(){
        return await axios.value.post('/api/faq')
            .then(response => {
                faq.value = response.data.data;
                return true
            })
            .catch(error => {return false});
    }
    function selectCategory(faq_category_id){
        selectedCategoryId.value = faq_category_id
        let allFaq = faq.value[currentLocale.value]?.faq ?? []
        allFaq = allFaq.sort((a,b) => a.position - b.position)
        question.value = allFaq.filter(q => {
            if(q.faq_category_id === faq_category_id){
                return q
            }
        })
    }
    watch(category, (state) => {
        let faq_category_id = state[0]?.faq_category_id
        if(!!faq_category_id){
            selectCategory(faq_category_id)
        }
    })
    return {getFaq,category,selectCategory,selectedCategoryId,question}
})