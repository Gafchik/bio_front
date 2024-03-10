import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import { useI18n } from 'vue-i18n';
import axiosInstance from "@/modules/axios.js";
import router from "@/routes/router.js"

export const useAppStore = defineStore('useAppStore', () => {
    const cookies = computed(() => router.app.config.globalProperties)
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);
    const axios = computed(() =>{
        axiosInstance.interceptors.request.use(config => {
            config.headers['X-Lang-Header'] = currentLocale.value
            return config;
        }, error => {
            return Promise.reject(error);
        })
        return axiosInstance
    });

    const drawer = ref(false)
    function changeLocale (newLocale) {
        locale.value = newLocale.value
    }
    return { currentLocale,changeLocale,drawer,axios }
})