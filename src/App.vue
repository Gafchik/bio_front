<script setup>
import AppHeader from '@/components/core/Header.vue'
import AppFooter from '@/components/core/Footer.vue'
import Drawer from "@/components/core/Drawer.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg">
    <AppHeader></AppHeader>
    <Drawer v-if="$q.platform.is.mobile"/>
    <q-page-container >
      <router-view></router-view>
    </q-page-container>
    <AppFooter></AppFooter>
  </q-layout>
</template>

<style scoped>
.bg {
  background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('@/assets/image/adaptive-icon.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  height: 100%;
  width: 100%;
}

</style>
