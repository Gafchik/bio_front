<script setup>
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import { useI18n } from "vue-i18n";
import {useBaseOnlyTextStore} from "@/store/common/base-only-text-store.js";
import {ref} from "vue";
import ARRAY_FULL_LOCALE from "@/constants/locales.js";
const {t} = useI18n()
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const baseOnlyTextStore = useBaseOnlyTextStore()
const {getItemInfoAsync} = baseOnlyTextStore
const {item} = storeToRefs(baseOnlyTextStore)
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: ''
  }
})
item.value = {
  ru: '',
  uk: '',
  en: '',
  ge: '',
}
getItemInfoAsync(props.id)
const tab = ref(ARRAY_FULL_LOCALE[0].value)
</script>

<template>
  <div class="q-my-lg q-mx-lg">
    <div class="text-left text-bold text-h6 text-green-8 q-mt-lg">{{t(title)}}</div>
    <span class="inner-image" v-html="item[currentLocale]"/>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>
