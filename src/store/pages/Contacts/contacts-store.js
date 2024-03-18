import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
export const useContactsStore = defineStore('useContactsStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale, cookies} = storeToRefs(appStore)
    const contacts = ref([])
    async function getContactsAsync(){
        axios.value.post('/api/contacts/get')
            .then(response => {
               contacts.value = response.data.data;
            })
            .catch(error => {});
    }
    return {getContactsAsync,contacts}
})