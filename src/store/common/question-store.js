import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";

export const useQuestionStore = defineStore('useQuestionStore' ,()=> {
    const appStore = useAppStore()
    const {axios,currentLocale, cookies} = storeToRefs(appStore)
    const questionDialog = ref(false)
    function openQuestionDialog(){
        questionDialog.value = true
    }
    function closeQuestionDialog(){
        questionDialog.value = false
    }
    async function sendQuestionAsync(payload){
        return axios.value.post('/api/question/send',payload)
            .then(response => {
                return true
            })
            .catch(error => {return false});
    }
    return {
        questionDialog,openQuestionDialog,closeQuestionDialog,sendQuestionAsync
    }
})