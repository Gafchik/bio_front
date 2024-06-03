import {defineStore, storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import {computed, ref} from "vue";

export const useStatusStore = defineStore('useStatusStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore);
    const countTrees = ref(0)
    const dialog = ref(false)
    const statuses = [
        {
            name: 'Curious Observer',
            count_from: 0,
            count_to: 24,
        },
        {
            name: 'Partner',
            count_from: 25,
            count_to: 49,
        },
        {
            name: 'Silver Partner',
            count_from: 50,
            count_to: 99,
        },
        {
            name: 'Gold partner',
            count_from: 100,
            count_to: 149,
        },
        {
            name: 'Platinum partner',
            count_from: 150,
            count_to: 499,
        },
        {
            name: 'Infinity partner',
            count_from: 500,
            count_to: 1000000000,
        },
    ]
    const currentStatus = computed(() => {
        return statuses.find(i => countTrees.value <= i.count_to && countTrees.value >= i.count_from)
    })
    const toNextLevel = computed(() => {
        return currentStatus.value.count_to - countTrees.value
    })
    function openDialog(){
        dialog.value = true
    }
    function closeDialog(){
        dialog.value = false
    }
    async function getCurrentStatus(){
        return await axios.value.post('/api/status/get')
            .then(response => {
                countTrees.value = response.data.data.status;
            })
            .catch(error => {});
    }
    getCurrentStatus()
    return {
        countTrees,getCurrentStatus,currentStatus,toNextLevel,statuses,dialog,openDialog,
        closeDialog
    }
})