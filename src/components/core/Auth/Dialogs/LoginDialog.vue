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
const {openActivationCodeDialog,showInfoMassage,openForgotPasswordDialog} = appStore
const {loginDialog,axios} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.auth'
const DEF_MODEL = {
  email: '',
  password: '',
}
const model = ref({...DEF_MODEL})
function closeDialog(){
  loginDialog.value = false
  model.value = {...DEF_MODEL}
}
function onReset() {
  model.value = {...DEF_MODEL}
}
function emailActivation(){
  closeDialog()
  openActivationCodeDialog()
}
function onSubmit() {

}
function forgotPassword(){
  closeDialog()
  openForgotPasswordDialog()
}
</script>

<template>
  <q-dialog v-model="loginDialog" persistent>
    <q-card :style="$q.platform.is.desktop ? 'width: 30%;' : 'width: 90%;'">
      <q-bar class="row items-center q-pb-none" style="background-color: #b8b398">
        <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.login`) }}</span>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="light-green-8"/>
      </q-bar>
      <q-form style="background-color: #e3e1c9 !important"
              @submit="onSubmit"
              id="login-form"
              @reset="onReset"
              class="q-gutter-md"
              ref="regDialogForm"
      >
        <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
          <q-input
              class="q-my-xs input-field"
              color="light-green-8"
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
              class="q-my-xs input-field"
              color="light-green-8"
              type="password"
              name="password"
              v-model="model.password"
              :label="t(`${TRANC_PREFIX}.password`)"
              lazy-rules
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.password`)),
                  rules.lengthMoreOrEqual(8),
              ]"
          />
          <div class="text-center q-mb-sm">
            <q-btn
                @click="emailActivation"
                outline
                rounded
                color="light-green-8"
                :label="t(`${TRANC_PREFIX}.activation.title`)" />
          </div>
          <div class="text-center">
            <q-btn
                @click="forgotPassword"
                outline
                rounded
                color="light-green-8"
                :label="t(`${TRANC_PREFIX}.forgot_password`)" />
          </div>

        </q-card-section>
        <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #e3e1c9">
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