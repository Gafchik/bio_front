<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import rules from "@/rules/rules.js";
import {STRIPE, SWIFT} from "@/constants/buy-young-payment-type.js";
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useTopUpWalletsStore} from "@/store/pages/TopUpWallets/top-up-wallets-store.js";
import {useSwiftDialogStore} from "@/store/common/swift-dialog-store.js";
const T_PREFIX = 'pages.top_up_wallet'
const appStore = useAppStore()
const {showInfoMassage} = appStore
const swiftDialogStore = useSwiftDialogStore()
const {openDialogSwift} = swiftDialogStore
const {openDialogConfirm} = useDialogConfirmStore()
const topUpWalletStore = useTopUpWalletsStore()
const {topUpWalletsAsync} = topUpWalletStore
const payload = ref({
  payment: STRIPE,
  top_up_amount: 0,
})
function resetForm(){
  payload.value.top_up_amount = 0
  payload.value.payment = STRIPE
}
const topUpWalletForm = ref(null)
function onSubmit(){
  topUpWalletForm.value.validate().then(res => {
    if(!!res){
      if(payload.value.payment !== SWIFT){
        openDialogConfirm({
          title: t(`${T_PREFIX}.confirm.title`),
          text: t(`${T_PREFIX}.confirm.text`,{amount: payload.value.top_up_amount}),
          func: topUpWalletsAsync,
          funcParams: payload,
          callbackFunc: (res) => {
            resetForm()
          },
        })
      }else{
        openDialogSwift({
          func: topUpWalletsAsync,
          funcParams: payload,
          callbackFunc: (res) => {
            resetForm()
          },
          closeFunc: (res) => {
            resetForm()
          },
        })
      }

    }
  })
}
</script>

<template>
  <PersonalTemplate :is-empty="false">
    <template v-slot:personal-content>
        <div class="q-mb-lg text-bold text-h6 text-green-8">
          {{t(`${T_PREFIX}.title`)}}
        </div>
      <q-form ref="topUpWalletForm">
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
                class="border-shadow q-mx-lg bg-card q-py-xl">
          <q-card-section>
            <div :class="$q.platform.is.desktop ? 'row justify-evenly' : ''">
              <div :class="$q.platform.is.desktop ? 'column col-2 justify-center items-center content-center' : 'justify-center items-center content-center text-center'">
                  <h5 class="text-bold">{{t(`${T_PREFIX}.amount_title`)}}</h5>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-center items-center content-center' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="payload.top_up_amount"
                    color="light-green-8"
                    type="number"
                    class="input-number-arrow q-ma-1 input-field"
                    filled
                    outlined
                    :label="t(`${T_PREFIX}.amount`)"
                    lazy-rules
                    :rules="[
                    rules.requiredWith0(t(`${T_PREFIX}.amount`)),
                    rules.numericValue(),
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.amount`),10)
                  ]"
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="attach_money" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-2 justify-center items-center content-center' : 'justify-center items-center content-center text-center'">
                <h5 class="text-bold">{{t(`${T_PREFIX}.payment.title`)}}</h5>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-start items-start content-center' : 'row justify-center items-center content-center'"
              :style="$q.platform.is.desktop ? 'padding-top: 4%' : ''">
                <q-radio
                    v-model="payload.payment"
                    :val="SWIFT"
                    size="50px"
                    :label="t(`${T_PREFIX}.payment.${SWIFT}`)"
                    color="light-green-8" />
                <q-radio
                    v-model="payload.payment"
                    :val="STRIPE"
                    size="50px"
                    :label="t(`${T_PREFIX}.payment.${STRIPE}`)"
                    color="light-green-8" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="row justify-center">
            <q-btn
                class="glossy q-mt-xl"
                unelevated
                rounded
                :size="$q.platform.is.desktop ? 'xl' : 'lg'"

                @click="onSubmit"
                color="light-green-8"
                :label="t(`${T_PREFIX}.submit`)"/>
          </q-card-actions>
        </q-card>
      </q-form>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";
.bg-card {
  position: relative; /* Чтобы позволить дочернему элементу использовать размеры карточки в качестве относительных */
}
.bg-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Занимает всю ширину карточки */
  height: 100%; /* Занимает всю высоту карточки */
  background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('@assets/image/adaptive-icon.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>