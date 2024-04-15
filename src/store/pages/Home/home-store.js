import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {shortLinkHelper} from "@/helpers/youtube-helper.js";
export const useHomeStore = defineStore('useHomeStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore)
    const homeInfo = ref({
        all_count_trees: 0,
        price_to_liter: 0,
        tree_all_price: 0,
        count_transactions: 0,
        count_yong_trees: 0,
        count_users: 0,
        videos: [],
        first_news: {
        },
    })

    async function getHomePageInfo() {
        return await axios.value.post('/api/home/get-info')
            .then(response => {
                homeInfo.value = response.data.data;
                homeInfo.value.videos.forEach(i => {
                    i.video = shortLinkHelper(i.video)
                })

                if(homeInfo.value.first_news.image === '/'){
                    homeInfo.value.first_news.image = import.meta.env.VITE_BASE_FILE_URL+homeInfo.value.first_news.image
                }else{
                    homeInfo.value.first_news.image = import.meta.env.VITE_BASE_FILE_URL+'/'+homeInfo.value.first_news.image
                }
            })
            .catch(error => {});
    }
    return {getHomePageInfo,homeInfo}
})