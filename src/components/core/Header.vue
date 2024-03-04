<script setup>
import menu from "@/constants/main-menu.js"
import {useI18n} from "vue-i18n";
import router from "@/routes/router.js";
const {t} = useI18n()
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import locales from "@/constants/locales.js"
import ukr from "@assets/image/header/locales/ukr.png"
import {ref} from "vue";

const appStore = useAppStore()
const {changeLocale} = appStore
const localesModel = ref({
  value: 'ukr',
  image: ukr
})
function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
</script>

<template>
  <q-header elevated class="bg-green-3">
    <q-toolbar>

      <q-btn flat round dense icon="menu" class="q-mr-sm mobile-only" />
      <q-avatar @click="redirectTo('home')">
        <img src="@assets/image/header/logo_image.svg" alt="logo_image">
      </q-avatar>

      <q-toolbar-title class="q-mt-sm" @click="redirectTo('home')">
        <img src="@assets/image/header/logo_text.svg" alt="logo_text">
      </q-toolbar-title>

      <q-select
          transition-show="flip-up"
          transition-hide="flip-down"
          standout
          bottom-slots
          v-model="localesModel"
          :options="locales"
          @update:model-value="changeLocale(localesModel)"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-img :src="scope.opt.image"/>
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:selected>
          <div>
            <q-avatar>
              <q-img :src="localesModel.image"/>
            </q-avatar>

          </div>
        </template>
      </q-select>

    </q-toolbar>
    <q-tabs class="desktop-only" inline-label>
      <q-tab v-for="item in menu"
              :icon="item.icon"
              :label="t(`main_menu.${item.label}`)"
              @click="redirectTo(item.route_name)"
      />
    </q-tabs>
  </q-header>
</template>

<style scoped>

</style>