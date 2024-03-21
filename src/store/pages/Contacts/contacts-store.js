import { defineStore } from 'pinia'
import {ref,computed,watch} from "vue";
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
export const useContactsStore = defineStore('useContactsStore', () => {
    const appStore = useAppStore()
    const {axios,currentLocale, cookies} = storeToRefs(appStore)
    const contacts = ref({})
    async function getContactsAsync(){
        axios.value.post('/api/contacts/get')
            .then(response => {
                let typeArrays = {};
                response.data.data.forEach(obj => {
                    if (!typeArrays.hasOwnProperty(obj.type)) {
                        typeArrays[obj.type] = [];
                    }
                    typeArrays[obj.type].push(obj);
                });

                // Сортировка контактов внутри каждого типа по позиции
                for (let type in typeArrays) {
                    typeArrays[type].sort((a, b) => a.position - b.position);
                }

                contacts.value = typeArrays;
            })
            .catch(error => {});
    }
    return {getContactsAsync,contacts}
})