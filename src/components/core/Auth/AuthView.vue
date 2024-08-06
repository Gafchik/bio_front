<script setup>
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
const {t} = useI18n()
const TRANC_PREFIX = 'common.auth'
const appStore = useAppStore()
const {openReginDialog,openLoginDialog,logout, redirectByName} = appStore
const {isLogin, userInfo} = storeToRefs(appStore)
const dropdownLabel = computed(() => {
  if(isLogin.value){
    return userInfo.value.last_name + ' ' + userInfo.value.first_name
  }else{
    return t(`${TRANC_PREFIX}.login`)+'/'+t(`${TRANC_PREFIX}.reg`)
  }
})
</script>

<template>
<div>
    <q-btn-dropdown
        flat
        icon="account_circle"
        color="black"
        content-style="background-color: #f5f3e4"
        :label="dropdownLabel"
    >
      <q-list v-if="!isLogin">
        <q-item clickable v-close-popup @click="openReginDialog">
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>
            <q-item-section>
              {{ t(`${TRANC_PREFIX}.reg`) }}
            </q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="openLoginDialog">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>
            {{ t(`${TRANC_PREFIX}.login`) }}
          </q-item-section>
        </q-item>
      </q-list>
      <template  v-if="isLogin">
        <q-list>
          <q-item clickable v-close-popup @click="redirectByName('personal')">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              {{ t(`${TRANC_PREFIX}.personal`) }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item clickable v-close-popup @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              {{ t(`${TRANC_PREFIX}.logout`) }}
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-btn-dropdown>
</div>
</template>

<style scoped>

</style>