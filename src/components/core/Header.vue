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
import AuthView from "@/components/core/Auth/AuthView.vue";
import {useBasketStore} from "@/store/common/basket-store.js";
import {useQuestionStore} from "@/store/common/question-store.js";
const basketStore = useBasketStore()
const {openBasketDialog} = basketStore
const appStore = useAppStore()
const {changeLocale} = appStore
const {drawer,localesModel,isLogin} = storeToRefs(appStore)
const questionStore = useQuestionStore()
const {openQuestionDialog} = questionStore

function redirectTo(routeName){
  router.push({
    name: routeName,
  })
}
</script>

<template>
<!--  <q-header reveal elevated offset="[1,1]" style="background: #ccc9a5">-->
  <q-header offset="[1,1]" style="background: #f5f3e4">
    <q-toolbar>
      <q-btn @click="drawer = !drawer" flat round dense icon="menu" class="q-mr-sm mobile-only text-black" />
      <q-avatar @click="redirectTo('home')">
        <img src="@assets/image/header/logo_image.svg" alt="logo_image">
      </q-avatar>

      <q-toolbar-title class="q-mt-sm" @click="redirectTo('home')">
        <img src="@assets/image/header/logo_text.svg" alt="logo_text">
      </q-toolbar-title>
      <div class="q-pb-sm" v-if="$q.platform.is.desktop">
        <q-btn
            flat icon="contact_support"
            color="black"
            size="md"
            rounded
            @click="openQuestionDialog"/>
      </div>
      <div class="q-pb-sm" v-show="isLogin && $q.platform.is.desktop">
        <q-btn
            flat icon="shopping_cart"
            color="black"
            size="md"
            rounded
            @click="openBasketDialog"/>
      </div>

      <AuthView class="q-mr-xl q-pb-sm" v-if="$q.platform.is.desktop"/>
      <q-select
          class="q-pt-sm"
          transition-show="flip-up"
          transition-hide="flip-down"
          standout
          filled
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