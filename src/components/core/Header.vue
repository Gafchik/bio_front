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
const {drawer} = storeToRefs(appStore)
const localesModel = ref({
  value: 'uk',
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

      <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-sm mobile-only" />
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
          <q-item v-bind="scope.itemProps" class="justify-center">
            <div v-if="$q.platform.is.mobile" class="row items-center">
              <q-item-section avatar>
                <q-img :src="scope.opt.image"/>
              </q-item-section>
              <q-item-section >
                <q-item-label>
                  {{t(`app.locale.${scope.opt.value}`)}}
                </q-item-label>
              </q-item-section>
            </div>
              <q-img v-else :src="scope.opt.image"/>
          </q-item>
        </template>
        <template v-slot:selected>
          <q-avatar>
              <q-img :src="localesModel.image"/>
          </q-avatar>
        </template>
      </q-select>

    </q-toolbar>
    <q-tabs v-if="$q.platform.is.desktop" inline-label>
      <q-tab v-for="item in menu" class="text-black"
             :icon="item.icon"
             :label="t(`main_menu.${item.label}`)"
             @click="redirectTo(item.route_name)"
      />
    </q-tabs>
  </q-header>
</template>

<style scoped>

</style>