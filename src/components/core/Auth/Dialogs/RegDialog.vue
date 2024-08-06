<script setup>
import Vue3QTelInput from 'vue3-q-tel-input'
import 'vue3-q-tel-input/dist/vue3-q-tel-input.esm.css'
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import rules from "@/rules/rules.js";
const {t} = useI18n()
const appStore = useAppStore()
const {showInfoMassage,openActivationCodeDialog} = appStore
const {regDialog,axios} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.auth'

const model = ref({
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const inputEmailReg = ref(null)
const errorEmailExist = ref(true)
function closeDialog(){
  regDialog.value = false
  errorEmailExist.value = true
  model.value = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
}
const regDialogForm = ref(null)

function onSubmit() {
  if(!errorEmailExist.value.error){
    axios.value.post('/api/auth/reg',model.value)
        .then(response => {
          showInfoMassage(t(`${TRANC_PREFIX}.reg_success`))
          closeDialog()
          openActivationCodeDialog()
        })
        .catch(error => {});
  }
}

function onReset() {
  model.value = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  }
  errorEmailExist.value = true
  regDialogForm.value.resetValidation()
}
function onInputEmail(){
  errorEmailExist.value = true
  let validRes = inputEmailReg.value.validate()
  if(!!validRes){
    axios.value.post('/api/auth/check-email',{email: model.value.email})
        .then(response => {
          errorEmailExist.value = !response.data.data.email_use
          inputEmailReg.value.validate()
        })
        .catch(error => {});
  }
}
const emailExistRule = () => v => errorEmailExist.value || t('app.rules.email_exist')
</script>

<template>
  <q-dialog v-model="regDialog" persistent>
    <q-card :style="$q.platform.is.desktop ? 'width: 30%;' : 'width: 90%;'">
      <q-bar class="row items-center q-pb-none" style="background-color: #f5f3e4; height: auto">
        <span class="text-h5 text-light-green-8">{{ t(`${TRANC_PREFIX}.reg`) }}</span>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="light-green-8"/>
      </q-bar>
      <q-form style="background-color: #f5f3e4"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          ref="regDialogForm"
      >
        <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="first_name"
              v-model="model.first_name"
              :label="t(`${TRANC_PREFIX}.name`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.name`))
              ]"
          />
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
              type="text"
              name="last_name"
              v-model="model.last_name"
              :label="t(`${TRANC_PREFIX}.surname`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.surname`))
              ]"
          />
          <vue3-q-tel-input
              class="q-my-xs input-field"
              color="light-green-8"
              name="phone"
              default-country="ua"
              v-model:tel="model.phone"
              :label="t(`${TRANC_PREFIX}.phone`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.phone`))
              ]"
          />
          <q-input
              ref="inputEmailReg"
              class="q-my-xs input-field"
              color="light-green-8"
              name="email"
              @blur="onInputEmail"
              v-model="model.email"
              :label="t(`${TRANC_PREFIX}.email`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.email`)),
                  rules.email(),
                  emailExistRule(),
              ]"
          />
          <q-input
              class="q-my-xs input-field"
              counter
              maxlength="8"
              color="light-green-8"
              type="password"
              name="password"
              v-model="model.password"
              :label="t(`${TRANC_PREFIX}.password`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.password`)),
                  rules.lengthMoreOrEqual(8),
              ]"
          />
          <q-input
              class="q-my-xs input-field"
              counter
              maxlength="8"
              color="light-green-8"
              type="password"
              name="password_confirmation"
              v-model="model.password_confirmation"
              :label="t(`${TRANC_PREFIX}.repeat_password`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.repeat_password`)),
                  rules.lengthMoreOrEqual(8),
                  rules.confirmField(model.password,t(`${TRANC_PREFIX}.password`)),
              ]"
          />
      </q-card-section>
      <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #f5f3e4">
        <q-btn type="reset"  flat class="q-mr-sm" icon="refresh"/>
        <q-btn type="submit" color="light-green-8" flat icon="done"/>
      </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>