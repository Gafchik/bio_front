import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import {shortLinkHelper} from "@/helpers/youtube-helper.js";
export const useGalleryStore = defineStore('useGalleryStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore)
    const allAlbums = ref([])
    const albumsImages = ref([])
    const albumsVideo = ref([])
    const selectedAlbumInfo = ref({})
    const selectedAlbumItems = ref([])
    async function getAlbumsAsync(){
        albumsImages.value = [];
        albumsVideo.value = [];
        await axios.value.post('/api/gallery/get-albums')
            .then(response => {
                response.data.data.forEach(obj => {
                    if(obj.album_label[0] === '/'){
                        obj.album_label = import.meta.env.VITE_BASE_FILE_URL+obj.album_label
                    }else{
                        obj.album_label = import.meta.env.VITE_BASE_FILE_URL+'/'+obj.album_label
                    }
                    !!obj.is_image
                        ? albumsImages.value.push(obj)
                        : albumsVideo.value.push(obj)
                });
                allAlbums.value = response.data.data;
            })
            .catch(error => {});
    }
    async function getAlbumDetails(id){
        if (isNaN(id)) {
            return false
        }
        selectedAlbumInfo.value = allAlbums.value.find((i) =>{return i.id === parseInt(id)})
        if(!selectedAlbumInfo.value){
            return false
        }
        return await axios.value.post('/api/gallery/get-albums-details',{
            id: id,
            is_image: selectedAlbumInfo.value.is_image
        })
            .then(response => {
                response.data.data.forEach(i => {
                    if(!!selectedAlbumInfo.value.is_image){
                        if(i.link[0] === '/'){
                            i.link = import.meta.env.VITE_BASE_FILE_URL+i.link
                        }else{
                            i.link = import.meta.env.VITE_BASE_FILE_URL+'/'+i.link
                        }
                    }else{
                        i.link = shortLinkHelper(i.link)
                    }
                })
                selectedAlbumItems.value = response.data.data
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        albumsImages,albumsVideo,getAlbumsAsync,getAlbumDetails,selectedAlbumInfo,selectedAlbumItems
    }
})