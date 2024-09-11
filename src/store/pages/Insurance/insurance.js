import {defineStore} from 'pinia'
import {ref, computed, watch} from "vue";
import {useAppStore} from '@/store/app-store.js'
import {storeToRefs} from 'pinia'
import {download} from "@/helpers/download-helper.js";

export const useInsuranceStore = defineStore('useInsuranceStore', () => {
    const appStore = useAppStore()
    const {axios, currentLocale} = storeToRefs(appStore)
    const insuranceTypes = ref([])
    const insuranceTrees = ref([])

    async function getInsuranceTypesAsync() {
        return await axios.value.post('/api/insurance/get-insurance-types')
            .then(response => {
                insuranceTypes.value = response.data.data
            })
            .catch(error => {
            });
    }

    async function getInsuranceTreesAsync() {
        return await axios.value.post('/api/insurance/get-insurance-trees')
            .then(response => {
                insuranceTrees.value = response.data.data
            })
            .catch(error => {
            });
    }

    async function downloadDocAsync(payload) {
        return await axios.value({
            method: 'post',
            url: '/api/insurance/download',
            responseType: 'blob',
            data: {id: payload.tree_id}
        })
        .then(response => {
            download(response.data, 'insurance.pdf')
        })
        .catch(error => {});
    }
    async function setInsuranceAsync(payload) {
        let data = {
            type: payload.insurance_type,
            ids: payload.trees.map(t => {return t.id})
        }
        return await axios.value.post('/api/insurance/create-insurance',data)
            .then(response => {
                return true
            })
            .catch(error => {
                return false
            });
    }

    return {
        getInsuranceTypesAsync, getInsuranceTreesAsync, insuranceTypes, insuranceTrees, downloadDocAsync,
        setInsuranceAsync,
    }
})