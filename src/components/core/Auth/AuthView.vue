<script setup>
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const TRANC_PREFIX = 'common.auth'
const appStore = useAppStore()
const {openReginDialog,openLoginDialog} = appStore
</script>

<template>
<div>
    <q-btn-dropdown
        flat
        icon="account_circle"
        color="black"
        content-style="background-color: #e3e1c9"
        :label="t(`${TRANC_PREFIX}.login`)+'/'+t(`${TRANC_PREFIX}.reg`)"
    >
      <q-list>
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

    </q-btn-dropdown>
</div>
</template>

<style scoped>

</style>