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
const {drawer,isLogin} = storeToRefs(appStore)
import {useBasketStore} from "@/store/common/basket-store.js";
import {useQuestionStore} from "@/store/common/question-store.js";
const basketStore = useBasketStore()
const {openBasketDialog} = basketStore
const questionStore = useQuestionStore()
const {openQuestionDialog} = questionStore
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
      <q-separator />
      <q-list v-show="isLogin && $q.platform.is.mobile">
        <q-item clickable v-close-popup @click="openBasketDialog">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            {{ t(`app.basket`) }}
          </q-item-section>
        </q-item>
      </q-list>
      <q-list v-show="$q.platform.is.mobile">
        <q-item clickable v-close-popup @click="openQuestionDialog">
          <q-item-section avatar>
            <q-icon name="contact_support" />
          </q-item-section>
          <q-item-section>
            {{ t(`app.question_dialog`) }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

