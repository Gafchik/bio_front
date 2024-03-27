import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
export const useNewsStore = defineStore('useNewsStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const newsCards = ref([])
    const cardPage = ref(1)
    const getCardRequest = ref(false)

    async function getNewsInfoAsync(id){
        if(!getCardRequest.value){
            getCardRequest.value = true
            axios.value.post('/api/news/get-cards',{page: cardPage.value})
                .then(response => {
                    cardPage.value++
                    let data = []
                    response.data.data.forEach(obj => {
                        obj.image =  import.meta.env.VITE_BASE_FILE_URL+obj.image
                    });
                    newsCards.value.push(...response.data.data)
                    getCardRequest.value = false
                    console.log(newsCards.value.length)
                })
                .catch(error => {});
        }
    }

    return {
        getNewsInfoAsync,newsCards,cardPage
    }
})