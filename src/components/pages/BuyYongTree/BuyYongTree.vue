<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {computed, ref} from "vue";
import {useBuyYongTreeStore} from "@/store/pages/BuyYongTree/buy-yong-tree-store.js";
import {storeToRefs} from "pinia";
import {BALANCE ,SWIFT,STRIPE} from "@/constants/buy-young-payment-type.js"
import rules from "@/rules/rules.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useAppStore} from "@/store/app-store.js";
import {useSwiftDialogStore} from "@/store/common/swift-dialog-store.js";
const T_PREFIX = 'pages.buy_yong_tree'
const appStore = useAppStore()
const {showInfoMassage} = appStore
const buyYongTreeStore = useBuyYongTreeStore()
const {startInfo} = storeToRefs(buyYongTreeStore)
const swiftDialogStore = useSwiftDialogStore()
const {openDialogSwift} = swiftDialogStore
const {getGetStartInfoAsync, buyAsync} = buyYongTreeStore
getGetStartInfoAsync()
const {openDialogConfirm} = useDialogConfirmStore()
const isEmpty = computed(() => {
  return !startInfo.value.countTree
})
const payload = ref({
  countTree: 0,
  payment: BALANCE,
  promo: '',
})
const buyYoungForm = ref(null)
const price = computed(() => {
  return payload.value.countTree * startInfo.value.price
})
function resetForm(){
  payload.value.countTree = 0
  payload.value.payment = BALANCE
  payload.value.promo = ''
}
function onSubmit(){
  buyYoungForm.value.validate().then(res => {
    if(!!res){
      if(payload.value.payment !== SWIFT){
        openDialogConfirm({
          title: t(`${T_PREFIX}.confirm.title`),
          text: t(`${T_PREFIX}.confirm.text`,{count: payload.value.countTree}),
          func: buyAsync,
          funcParams: payload,
          callbackFunc: (res) => {
            resetForm()
          },
        })
      }else{
        openDialogSwift({
          func: buyAsync,
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
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${T_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <q-form ref="buyYoungForm">
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
                class="border-shadow q-mx-lg bg-card q-py-xl">
          <q-card-section>
            <div :class="$q.platform.is.desktop ? 'row justify-evenly' : ''">
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-center items-center content-center' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="startInfo.countTree"
                    color="light-green-8"
                    type="number"
                    class="input-number-arrow q-ma-1 input-field"
                    filled
                    readonly
                    outlined
                    :label="t(`${T_PREFIX}.countTree`)"
                    :rules="[
                    rules.numericValue(),
                  ]"
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="forest" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-center items-center content-center' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="payload.countTree"
                    color="light-green-8"
                    type="number"
                    class="input-number-arrow q-ma-1 input-field"
                    filled
                    outlined
                    :label="t(`${T_PREFIX}.buyCountTree`)"
                    lazy-rules
                    :rules="[
                    rules.requiredWith0(t(`${T_PREFIX}.buyCountTree`)),
                    rules.numericValue(),
                    rules.numericLessOrEqual(t(`${T_PREFIX}.buyCountTree`),100),
                    rules.numericMoreOrEqual(t(`${T_PREFIX}.buyCountTree`),1)
                  ]"
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="eco" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-start items-start content-center' : 'row justify-start items-start content-center'">
                <div>
                  <span class="text-bold">{{t(`${T_PREFIX}.payment.title`)}}</span>
                </div>
                <q-radio
                    v-model="payload.payment"
                    :val="BALANCE"
                    size="50px"
                    :label="t(`${T_PREFIX}.payment.${BALANCE}`)"
                    color="light-green-8" />
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
              <div :class="$q.platform.is.desktop ? 'column col-3 justify-center items-center content-center' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="price"
                    color="light-green-8"
                    readonly
                    filled
                    outlined
                    :label="t(`${T_PREFIX}.allPrice`)"
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="attach_money" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
                <q-input
                    v-model.number="payload.promo"
                    color="light-green-8 q-mt-sm"
                    class="q-ma-1 input-field"
                    filled
                    outlined
                    :label="t(`${T_PREFIX}.promo`)"
                    lazy-rules
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="percent" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
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