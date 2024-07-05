<script setup>
import moment from "moment";
import momentTz from "moment-timezone";
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import router from "@/routes/router.js"
import {useStatusStore} from "@/store/pages/Status/status.js";

const currentRouteName = router.currentRoute.value.name
const {t} = useI18n()
const appStore = useAppStore()
const {userInfo} = storeToRefs(appStore)
const {redirectByName, getUserInfo,copyToClipboardNotify} = appStore
getUserInfo()
const currentDate = ref(moment().format("DD.MM.YYYY"));
const currentTime = ref(moment().format("HH:mm:ss"));
const TRANC_PREFIX = 'common.userDisplay'
setInterval(() => {
  currentDate.value = moment().format("DD.MM.YYYY");
  currentTime.value = moment().format("HH:mm:ss");
}, 1000);

const timeZone = momentTz.tz.guess();
const statusStore = useStatusStore()
const {currentStatus} = storeToRefs(statusStore)
function getBalance(type){
  if(!!userInfo.value){
    let balance = userInfo.value.wallets.find(w => w.type === type)?.balance
    if(!!balance){
      return balance/100
    }
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
const walletToggle = ref(false)
const walletRoutes = [
    'withdrawal_history',
    'withdrawal',
]
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
              @click="copyToClipboardNotify(userInfo.promocode)"
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
    <q-tabs
        :vertical="$q.platform.is.desktop"
        inline-label class="q-mt-sm"
        outside-arrows
        mobile-arrows
    >
      <q-tab  :class="currentRouteName === 'status' ? 'text-white' : ''"
              :style="currentRouteName === 'status' ? 'background-color: #a89c4c' : ''"
              icon="workspace_premium"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? currentStatus.name : ''"
              @click="redirectByName('status')"
      />
      <q-tab  :class="currentRouteName === 'personal' ? 'text-white' : ''"
              :style="currentRouteName === 'personal' ? 'background-color: #a89c4c' : ''"
              icon="forest"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.personal`) : ''"
              @click="redirectByName('personal')"
      />
      <q-tab  :class="currentRouteName === 'purchases' ? 'text-white' : ''"
              :style="currentRouteName === 'purchases' ? 'background-color: #a89c4c' : ''"
              icon="shopping_basket"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.purchases`) : ''"
              @click="redirectByName('purchases')"
      />
      <q-tab  :class="currentRouteName === 'profile' ? 'text-white' : ''"
              :style="currentRouteName === 'profile' ? 'background-color: #a89c4c' : ''"
              icon="account_circle"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.profile`) : ''"
              @click="redirectByName('profile')"
      />
      <q-expansion-item
          v-if="$q.platform.is.desktop"
          :header-inset-level="1"
          expand-separator
          default-opened
          icon="wallet"
          :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.title`) : ''"
      >
        <q-tab  :class="currentRouteName === 'withdrawal_history' ? 'text-white' : ''"
                :style="currentRouteName === 'withdrawal_history' ? 'background-color: #a89c4c' : ''"
                icon="shopping_cart_checkout"
                :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.withdrawal_history`) : ''"
                @click="redirectByName('withdrawal_history')"
        />
        <q-tab  :class="currentRouteName === 'withdrawal' ? 'text-white' : ''"
                :style="currentRouteName === 'withdrawal' ? 'background-color: #a89c4c' : ''"
                icon="add_card"
                :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.withdrawal`) : ''"
                @click="redirectByName('withdrawal')"
        />
        <q-tab  :class="currentRouteName === 'transactions_history' ? 'text-white' : ''"
                :style="currentRouteName === 'transactions_history' ? 'background-color: #a89c4c' : ''"
                icon="currency_exchange"
                :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.transactions_history`) : ''"
                @click="redirectByName('transactions_history')"
        />
        <q-tab  :class="currentRouteName === 'tree_store_sell' ? 'text-white' : ''"
                :style="currentRouteName === 'tree_store_sell' ? 'background-color: #a89c4c' : ''"
                icon="storefront"
                :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.tree_store_sell`) : ''"
                @click="redirectByName('tree_store_sell')"
        />
      </q-expansion-item>
      <q-tab
              :class="walletRoutes.includes(currentRouteName) ? 'text-white' : ''"
              :style="walletRoutes.includes(currentRouteName) ? 'background-color: #a89c4c' : ''"
              icon="wallet"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.wallet.withdrawal_history`) : ''"
              @click="walletToggle = !walletToggle"
              v-if="$q.platform.is.mobile"
      />
      <q-tab  :class="currentRouteName === 'user_map' ? 'text-white' : ''"
              :style="currentRouteName === 'user_map' ? 'background-color: #a89c4c' : ''"
              icon="map"
              :dense="$q.platform.is.mobile"
              :label="$q.platform.is.desktop ? t(`${TRANC_PREFIX}.map`) : ''"
              @click="redirectByName('user_map')"
      />
    </q-tabs>
    <q-tabs :vertical="true" inline-label class="q-mt-sm"  v-if="$q.platform.is.mobile && !!walletToggle">
      <q-tab  :class="currentRouteName === 'withdrawal_history' ? 'text-white' : ''"
              :style="currentRouteName === 'withdrawal_history' ? 'background-color: #a89c4c' : ''"
              icon="shopping_cart_checkout"
              :label="t(`${TRANC_PREFIX}.wallet.withdrawal_history`)"
              @click="redirectByName('withdrawal_history')"
      />
      <q-tab  :class="currentRouteName === 'withdrawal' ? 'text-white' : ''"
              :style="currentRouteName === 'withdrawal' ? 'background-color: #a89c4c' : ''"
              icon="add_card"
              :label="t(`${TRANC_PREFIX}.wallet.withdrawal`)"
              @click="redirectByName('withdrawal')"
      />
      <q-tab  :class="currentRouteName === 'transactions_history' ? 'text-white' : ''"
              :style="currentRouteName === 'transactions_history' ? 'background-color: #a89c4c' : ''"
              icon="currency_exchange"
              :label="t(`${TRANC_PREFIX}.wallet.transactions_history`)"
              @click="redirectByName('transactions_history')"
      />
      <q-tab  :class="currentRouteName === 'tree_store_sell' ? 'text-white' : ''"
              :style="currentRouteName === 'tree_store_sell' ? 'background-color: #a89c4c' : ''"
              icon="storefront"
              :label="t(`${TRANC_PREFIX}.wallet.tree_store_sell`)"
              @click="redirectByName('tree_store_sell')"
      />
    </q-tabs>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
.user-display-row {
  border-bottom: 1px solid #7ba438; /* Цвет и стиль линии */
}
</style>
