<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
const TRANC_PREFIX = 'pages.withdrawal'
const {t} = useI18n()
import {CARD,SWIFT} from "@/constants/withdrawal-type.js"
import rules from "@/rules/rules.js";
import Vue3QTelInput from "vue3-q-tel-input";
const payload = ref({
  type: CARD,
  amount: 0,
  account_number: null,
  full_name: '',
  phone: '',
  bank: '',
})
const withdrawalForm = ref(null)
function onSubmit(){
  console.log(payload.value)
}
function onReset(){

}
</script>

<template>
  <PersonalTemplate :is-empty="false" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <q-form @submit="onSubmit"
              @reset="onReset"
              ref="withdrawalForm"
      >
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
                class="border-shadow q-mx-lg bg-card q-py-xl">
          <q-card-section>
            <div :class="$q.platform.is.desktop ? 'row' : ''">
              <div :class="$q.platform.is.desktop ? 'column col-2 justify-center items-center content-center' : 'row justify-center items-center content-center'">
                <q-radio
                    v-model="payload.type"
                    :val="CARD"
                    size="50px"
                    :label="t(`app.withdrawal.type.${CARD}`)"
                    color="light-green-8" />
                <q-radio
                    v-model="payload.type"
                    :val="SWIFT"
                    size="50px"
                    :label="t(`app.withdrawal.type.${SWIFT}`)"
                    color="light-green-8" />
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-5 justify-center items-center content-center' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="payload.amount"
                    color="light-green-8"
                    type="number"
                    class="input-number-arrow q-ma-1 input-field"
                    filled
                    outlined
                    :label="t(`${TRANC_PREFIX}.amount`)"
                    :rules="[
                    rules.requiredWith0(t(`${TRANC_PREFIX}.amount`)),
                    rules.numericValue(),
                    rules.numericMore(t(`${TRANC_PREFIX}.amount`),50)
                  ]"
                >
                  <template v-slot:append>
                    <q-avatar>
                      <q-icon size="lg" name="attach_money" color="light-green-8"/>
                    </q-avatar>
                  </template>
                </q-input>
              </div>
              <div :class="$q.platform.is.desktop ? 'column col-5 justify-center q-pr-xl' : 'justify-center items-center content-center'">
                <q-input
                    v-model.number="payload.account_number"
                    color="light-green-8"
                    class="input-field input-number-arrow"
                    type="number"
                    :label="payload.type === CARD ? t(`${TRANC_PREFIX}.card_number`) : t(`${TRANC_PREFIX}.account_number`)"
                    :rules="[
                      rules.requiredWith0(payload.type === CARD ? t(`${TRANC_PREFIX}.card_number`) : t(`${TRANC_PREFIX}.account_number`)),
                      rules.numericValue(),
                    ]"
                />
                <q-input
                    v-show="payload.type === CARD"
                    :disable="payload.type !== CARD"
                    v-model.number="payload.bank"
                    color="light-green-8"
                    :label="t(`${TRANC_PREFIX}.bank`)"
                    :rules="[
                      rules.required(t(`${TRANC_PREFIX}.bank`)),
                    ]"
                />
                <vue3-q-tel-input
                    v-show="payload.type === SWIFT"
                    :disable="payload.type !== SWIFT"
                    class="q-my-xs input-field"
                    color="light-green-8"
                    name="phone"
                    default-country="ua"
                    v-model:tel="payload.phone"
                    :label="t(`${TRANC_PREFIX}.phone`)"
                    :rules="[
                      rules.required(t(`${TRANC_PREFIX}.phone`))
                    ]"
                />
                <q-input
                    v-model.number="payload.full_name"
                    color="light-green-8"
                    :label="t(`${TRANC_PREFIX}.full_name`)"
                    :rules="[
                      rules.required(t(`${TRANC_PREFIX}.full_name`)),
                    ]"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="row justify-center">
            <q-btn
                class="glossy"
                unelevated
                rounded
                size="xl"
                type="submit"
                color="light-green-8"
                :label="t(`${TRANC_PREFIX}.submit`)"/>
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