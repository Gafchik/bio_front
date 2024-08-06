<script setup>
import menu from "@/constants/main-menu.js"
import {useI18n} from "vue-i18n";
import router from "@/routes/router.js";
const {t} = useI18n()
import { useAppStore } from '@/store/app-store.js'
import { storeToRefs } from 'pinia'
import AuthView from "@/components/core/Auth/AuthView.vue";
const appStore = useAppStore()
const {} = appStore
const {drawer} = storeToRefs(appStore)

function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
</script>

<template>
  <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="500"
      bordered
      style="background: #f5f3e4"
  >
    <q-scroll-area class="fit">
      <q-list>
        <AuthView class="q-pa-xs"/>
      </q-list>
      <q-separator />
      <q-list>
        <template v-for="item in menu">
          <q-item clickable @click="redirectTo(item.route_name)" v-ripple>
            <q-item-section v-show="!!item.icon" avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              {{ t(`main_menu.${item.label}`) }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

