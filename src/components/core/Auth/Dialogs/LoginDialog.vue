<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";

const appStore = useAppStore()
const {} = appStore
const {loginDialog} = storeToRefs(appStore)
</script>

<template>
  <q-dialog v-model="loginDialog" persistent full-width >
    vdfvfvdf
  </q-dialog>
</template>

<style scoped>

</style>