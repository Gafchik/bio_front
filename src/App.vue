<script setup>
import AppHeader from '@/components/core/Header.vue'
import AppFooter from '@/components/core/Footer.vue'
import Drawer from "@/components/core/Drawer.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader></AppHeader>
    <Drawer v-if="$q.platform.is.mobile"/>
    <q-page-container >
      <router-view></router-view>
    </q-page-container>
    <AppFooter></AppFooter>
  </q-layout>
</template>

<style scoped>
</style>
