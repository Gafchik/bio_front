<script setup>
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
const faqStore = useFaqStore()
const {getFaq} = faqStore
const {category} = storeToRefs(faqStore)

getFaq();

</script>

<template>

  <div>
    <div v-if="!category.length">EMPTY</div>
    <div v-else v-for="(key,value) in category">{{key}}</div>
  </div>
</template>

<style scoped>

</style>