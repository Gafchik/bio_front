import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
export const useProfileStore = defineStore('useProfileStore', () => {
    const appStore = useAppStore()
    const {getUserInfo} = appStore
    const {axios,currentLocale} = storeToRefs(appStore)
    async function changeUserInfoAsync(payload){
        return await axios.value.post('/api/profile/change-user-info',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    async function changePasswordAsync(payload){
        return await axios.value.post('/api/profile/change-password',payload)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }
    return {
        changeUserInfoAsync,changePasswordAsync
    }
})