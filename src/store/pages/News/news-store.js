import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
export const useNewsStore = defineStore('useNewsStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const newsCards = ref([])
    const newsDetail = ref({})
    const cardPage = ref(1)
    const getCardRequest = ref(false)

    async function getNewsInfoAsync(){
        if(!getCardRequest.value){
            getCardRequest.value = true
            axios.value.post('/api/news/get-cards',{page: cardPage.value})
                .then(response => {
                    cardPage.value++

                    response.data.data.forEach(obj => {
                        if(obj.image[0] === '/'){
                            obj.image = import.meta.env.VITE_BASE_FILE_URL+obj.image
                        }else{
                            obj.image = import.meta.env.VITE_BASE_FILE_URL+'/'+obj.image
                        }

                    });
                    newsCards.value.push(...response.data.data)
                    getCardRequest.value = false
                })
                .catch(error => {});
        }
    }
    async function getNewsDetails(id){
        if (!isNaN(id)) {
            return axios.value.post('/api/news/get-cards-details',{id: id})
                .then(response => {
                    newsDetail.value = response.data.data
                    if(newsDetail.value.image[0] === '/'){
                        newsDetail.value.image = import.meta.env.VITE_BASE_FILE_URL+newsDetail.value.image
                    }else{
                        newsDetail.value.image = import.meta.env.VITE_BASE_FILE_URL+'/'+newsDetail.value.image
                    }
                    return true
                })
                .catch(error => {
                    return false
                });
        }
    }
    async function addView(id){
        axios.value.post('/api/news/add-view',{id: id})
            .then(response => {})
            .catch(error => {});
    }
    return {
        getNewsInfoAsync,newsCards,cardPage,getNewsDetails,newsDetail,addView
    }
})