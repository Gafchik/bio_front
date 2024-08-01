<script setup>
import AppHeader from '@/components/core/Header.vue'
import AppFooter from '@/components/core/Footer.vue'
import Drawer from "@/components/core/Drawer.vue";
import RegDialog from "@/components/core/Auth/Dialogs/RegDialog.vue";
import LoginDialog from "@/components/core/Auth/Dialogs/LoginDialog.vue";
import ActivationCodeDialog from "@/components/core/Auth/Dialogs/ActivationCodeDialog.vue";
import LoadingDialog from "@/components/common/LoadingDialog.vue";
import DialogConfirm from "@/components/common/DialogConfirm.vue";
import ForgotPasswordDialog from "@/components/core/Auth/Dialogs/ForgotPasswordDialog.vue";
import SwiftDialog from "@/components/common/SwiftDialog.vue";
</script>

<template>
<!--  <q-layout view="hHh lpR fFf" class="bg">-->
  <q-layout view="hHh lpR fFf" class="my-bg-color">
    <AppHeader></AppHeader>
    <Drawer v-if="$q.platform.is.mobile"/>
    <q-page-container >
      <router-view></router-view>
    </q-page-container>
    <AppFooter></AppFooter>
    <LoadingDialog/>
    <RegDialog/>
    <LoginDialog/>
    <ActivationCodeDialog/>
    <ForgotPasswordDialog/>
    <DialogConfirm/>
    <SwiftDialog/>
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
<style lang="scss">
.ql-align-right {
  text-align: right;
}
.ql-align-center {
  text-align: center;
}
.ql-align-left {
  text-align: left;
}
@import "@sass/common-style.css";
</style>