<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import rules from "@/rules/rules.js";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
const {t} = useI18n()
const appStore = useAppStore()
const {showInfoMassage,openLoginDialog} = appStore
const {activationCodeDialog,axios} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.auth'
const DEF_MODEL = {
  email: '',
  code: '',
}
const activationCodeDialogForm = ref(null)
const model = ref({...DEF_MODEL})
function closeDialog(){
  activationCodeDialog.value = false
  model.value = {...DEF_MODEL}
}
function onSubmit() {
  axios.value.post('/api/auth/email-activate',model.value)
      .then(response => {
        showInfoMassage(t(`${TRANC_PREFIX}.activation.success`))
        closeDialog()
        openLoginDialog()
      })
      .catch(error => {});
}
function onReset() {
  model.value = {...DEF_MODEL}
}
</script>

<template>
  <q-dialog v-model="activationCodeDialog" persistent>
    <q-card :style="$q.platform.is.desktop ? 'width: 30%;' : 'width: 90%;'">
      <q-bar class="row items-center q-pb-none" style="background-color: #e3e1c9">
        <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.activation.title`) }}</span>
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
              ref="activationCodeDialogForm"
      >
        <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
          <q-input
              ref="inputEmail"
              class="q-my-xs"
              color="light-green-8"
              name="email"
              v-model="model.email"
              :label="t(`${TRANC_PREFIX}.email`)"
              :rules="[
                  rules.required(t(`${TRANC_PREFIX}.email`)),
                  rules.email(),
              ]"
          />
          <q-input
              class="q-my-xs input-number"
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

</style>