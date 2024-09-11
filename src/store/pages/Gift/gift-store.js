import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {ref} from "vue";
import {download} from "@/helpers/download-helper.js";

export const useGiftStore = defineStore('useGiftStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale} = storeToRefs(appStore)
    const giftInfo = ref([])
    async function giftTreesAsync(payload){
        return await axios.value.post('/api/gift/create-gift',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function getGiftInfoAsync(){
        return await axios.value.post('/api/gift/get-gift-info')
            .then(response => {
                giftInfo.value = response.data.data
            })
            .catch(error => {
                giftInfo.value = []
            });
    }
    async function cancelMyGiftAsync(payload){
        return await axios.value.post('/api/gift/cancel-my-gift',{gift_id: payload})
            .then(response => {
                getGiftInfoAsync()
            })
            .catch(error => {});
    }
    async function downloadGiftCertificateAsync(payload){
        return await axios.value({
            method: 'post',
            url: '/api/gift/download-gift-certificate',
            responseType: 'blob',
            data: {gift_id: payload}
        })
            .then(response => {
                download(response.data, 'gift-certificate.pdf')
            })
            .catch(error => {});
    }
    async function getGiftByCodeAsync(payload){
        return await axios.value.post('/api/gift/get-gift-by-code',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        giftTreesAsync,getGiftInfoAsync,giftInfo,cancelMyGiftAsync,downloadGiftCertificateAsync,
        getGiftByCodeAsync,
    }
})