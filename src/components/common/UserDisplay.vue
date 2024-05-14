<script setup>
import moment from "moment";
import momentTz from "moment-timezone";
import {computed, ref, watch} from "vue";
import { copyToClipboard } from 'quasar'
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import router from "@/routes/router.js"

const currentRouteName = router.currentRoute.value.name
const {t} = useI18n()
const appStore = useAppStore()
const {userInfo} = storeToRefs(appStore)
const {redirectByName, getUserInfo} = appStore
getUserInfo()
const currentDate = ref(moment().format("YYYY-MM-DD"));
const currentTime = ref(moment().format("HH:mm:ss"));
const TRANC_PREFIX = 'common.userDisplay'
setInterval(() => {
  currentDate.value = moment().format("YYYY-MM-DD");
  currentTime.value = moment().format("HH:mm:ss");
}, 1000);

const timeZone = momentTz.tz.guess();

function getBalance(type){
  let balance = userInfo.value.wallets.find(w => w.type === type)?.balance
  if(!!balance){
    return balance/100
  }
  return 0
}
const balance = ref(0)
const balance_bonus = ref(0)
const balance_reserve = ref(0)
const count_trees = ref(0)
watch(userInfo,async (newValue, oldValue) => {
  balance.value = getBalance(null)
  balance_bonus.value = getBalance('bonus')
  balance_reserve.value = getBalance('futures')
  count_trees.value = newValue.count_trees
})
</script>

<template>
  <div class="q-pa-lg">
    <q-bar style="background-color: #e3e1c9;">
      <q-icon name="location_on" class="q-mr-xs"/>
      <span class="text-subtitle2">{{ timeZone }}</span>
      <q-space/>
      <q-icon name="calendar_today" class="q-mr-xs"/>
      <span class="text-subtitle2">{{ currentDate }}</span>
      <q-space/>
      <q-icon name="schedule" class="q-mr-xs"/>
      <span class="text-subtitle2">{{ currentTime }}</span>
    </q-bar>
    <div class="text-center q-mt-lg">
      <span class="text-subtitle1 text-red text-bold">{{t(`${TRANC_PREFIX}.promocode`)}}</span>
    </div>
    <div class="user-display-row">
      <q-input
          v-model="userInfo.promocode"
          readonly
          borderless
          :input-style="{ color: 'green' }"
          dense>
        <template v-slot:after>
          <q-btn
              @click="copyToClipboard(userInfo.promocode)"
              round
              color="light-green-8"
              dense
              flat
              icon="content_copy" />
        </template>
      </q-input>
    </div>
    <div class="row user-display-row">
      <div class="col" @click="redirectByName('personal')">
        <q-input
            v-model="count_trees"
            readonly
            borderless
            :input-style="{ color: 'green', 'font-weight': 'bold' }"
            :label="t(`${TRANC_PREFIX}.count_trees`)"
        >
          <template v-slot:before>
            <q-icon name="forest" color="light-green-8"/>
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
            v-model="balance"
            readonly
            borderless
            :input-style="{ color: 'green', 'font-weight': 'bold' }"
            :label="t(`${TRANC_PREFIX}.balance`)"
        >
          <template v-slot:before>
            <q-icon name="arrow_upward" color="light-green-8"/>
          </template>
          <template v-slot:after>
            <q-icon name="attach_money" color="light-green-8"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row user-display-row">
      <div class="col">
        <q-input
            v-model="balance_bonus"
            readonly
            borderless
            :input-style="{ color: 'green', 'font-weight': 'bold' }"
            :label="t(`${TRANC_PREFIX}.balance_bonus`)"
        >
          <template v-slot:before>
            <q-icon name="redeem" color="light-green-8"/>
          </template>
          <template v-slot:after>
            <q-icon name="attach_money" color="light-green-8"/>
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-input
            v-model="balance_reserve"
            readonly
            borderless
            :input-style="{ color: 'green', 'font-weight': 'bold' }"
            :label="t(`${TRANC_PREFIX}.balance_reserve`)"
        >
          <template v-slot:before>
            <q-icon name="sell" color="light-green-8"/>
          </template>
          <template v-slot:after>
            <q-icon name="attach_money" color="light-green-8"/>
          </template>
        </q-input>
      </div>
    </div>
    <q-tabs vertical inline-label>
      <q-tab  :class="currentRouteName === 'profile' ? 'text-white' : ''"
              :style="currentRouteName === 'profile' ? 'background-color: #a89c4c' : ''"
             icon="account_circle"
             :label="t(`${TRANC_PREFIX}.profile`)"
             @click="redirectByName('profile')"
      />
<!--      <q-list>-->
<!--        <q-item clickable v-close-popup @click="redirectByName('profile')" style="background-color: #a89c4c">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="account_circle" color="white"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section class="text-white">-->
<!--            {{ t(`${TRANC_PREFIX}.profile`) }}-->
<!--          </q-item-section>-->
<!--        </q-item>-->
<!--      </q-list>-->
    </q-tabs>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
.user-display-row {
  border-bottom: 1px solid #7ba438; /* Цвет и стиль линии */
}
</style>
