import { defineStore } from 'pinia'
import {ref,computed} from "vue";
import { useI18n } from 'vue-i18n';

export const useAppStore = defineStore('useAppStore', () => {
    const { locale } = useI18n();
    const currentLocale = computed(() => locale.value);
    const drawer = ref(false)
    function changeLocale (newLocale) {
        locale.value = newLocale.value
    }

    return { currentLocale,changeLocale,drawer }
})