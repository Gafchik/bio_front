<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import rules from "@/rules/rules.js";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
const {openDialogConfirm} = useDialogConfirmStore()
const appStore = useAppStore()
const {showInfoMassage,openForgotPasswordDialog} = appStore
const {forgotPasswordDialog,axios} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.auth'

const model = ref({
  email: '',
  code: '',
  password: '',
  password_confirmation: '',
})
const emailInputPass = ref(null)
const isCorrectCode = ref(false)
function closeDialog(){
  forgotPasswordDialog.value = false
  model.value = {
    email: '',
    code: '',
    password: '',
    password_confirmation: '',
  }
}
function onReset() {
  model.value = {
    email: '',
    code: '',
    password: '',
    password_confirmation: '',
  }
}
function sendMail(){
  if(emailInputPass.value.validate()){
    openDialogConfirm({
      title: t(`${TRANC_PREFIX}.forgot_password_confirm.title`),
      text: t(`${TRANC_PREFIX}.forgot_password_confirm.text`),
      func: forgotPasswordAsync,
    })
  }
}
async function forgotPasswordAsync(){
  axios.value.post('/api/auth/forgot-password-send-code',{email: model.value.email})
      .then(response => {
        showInfoMassage(t(`${TRANC_PREFIX}.forgot_password_confirm.success`))
      })
      .catch(error => {});
}
function onSubmit() {
  isCorrectCode.value
      ? changePassword()
      : checkCode()
}
async function checkCode(){
  axios.value.post('/api/auth/check-code',{
    email: model.value.email,
    code: model.value.code,
  })
      .then(response => {
        isCorrectCode.value = true
      })
      .catch(error => {});
}
async function changePassword(){
  axios.value.post('/api/auth/change-password',model.value)
      .then(response => {
        showInfoMassage(t(`${TRANC_PREFIX}.forgot_password_change_success`))
        closeDialog()
      })
      .catch(error => {});
}

</script>

<template>
  <q-dialog v-model="forgotPasswordDialog" persistent>
    <q-card :style="$q.platform.is.desktop ? 'width: 30%;' : 'width: 90%;'">
      <q-bar class="row items-center q-pb-none" style="background-color: #f5f3e4; height: auto">
        <span class="text-h5 text-light-green-8">{{ t(`${TRANC_PREFIX}.forgot_password`) }}</span>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="light-green-8"/>
      </q-bar>
      <q-form style="background-color: #f5f3e4 !important"
              @submit="onSubmit"
              id="login-form"
              class="q-gutter-md"
              ref="forgotPasswordDialogForm"
      >
        <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
          <q-input
              v-if="!isCorrectCode"
              ref="emailInputPass"
              class="q-my-xs"
              color="light-green-8 input-field"
              name="email"
              v-model="model.email"
              :label="t(`${TRANC_PREFIX}.email`)"
              lazy-rules
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.email`)),
                  rules.email(),
              ]"
          />
          <q-input
              v-if="!isCorrectCode"
              class="q-my-xs input-field"
              color="light-green-8"
              name="code"
              type="text"
              counter
              maxlength="6"
              v-model="model.code"
              :label="t(`${TRANC_PREFIX}.activation.input_code`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.activation.input_code`)),
                  rules.lengthEqual(6),
              ]"
          />
          <q-input
              v-if="isCorrectCode"
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
              v-if="isCorrectCode"
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
          <div class="text-center q-mb-sm">
            <q-btn
                v-if="!isCorrectCode"
                @click="sendMail"
                outline
                rounded
                color="light-green-8"
                :label="t(`${TRANC_PREFIX}.sand_forgot_mail`)" />
          </div>

        </q-card-section>
        <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #f5f3e4">
          <q-btn type="submit" color="light-green-8" flat icon="done"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>