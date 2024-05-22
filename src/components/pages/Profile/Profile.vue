<script setup>
import rules from "@/rules/rules.js";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useProfileStore} from "@/store/pages/Profile/profile-store.js";
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";

const {openDialogConfirm} = useDialogConfirmStore()
const {t} = useI18n()
const TRANC_PREFIX = 'pages.profile'
const appStore = useAppStore()
const {getUserInfo,showInfoMassage} = appStore
const {userInfo,axios,} = storeToRefs(appStore)
const profileStore = useProfileStore()
const {changeUserInfoAsync,changePasswordAsync} = profileStore

const modelUserInfo = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})
const isChangeInfo = ref(false)
function setDefaultUserInfo(){
  modelUserInfo.value.email = userInfo.value.email;
  modelUserInfo.value.first_name = userInfo.value.first_name;
  modelUserInfo.value.last_name = userInfo.value.last_name;
  modelUserInfo.value.phone = userInfo.value.phone;
}
getUserInfo().then(() =>{
  setDefaultUserInfo()
})

function onSubmitUserInfo(){
  openDialogConfirm({
    title: t(`${TRANC_PREFIX}.change_user_info_confirm.title`),
    text: t(`${TRANC_PREFIX}.change_user_info_confirm.text`),
    func: changeUserInfoAsync,
    funcParams: modelUserInfo.value,
    callbackFunc: changeUserInfoCallback
  })
}
function changeUserInfoCallback(){
  getUserInfo().then(() =>{
    isChangeInfo.value = false
    setDefaultUserInfo()
  })
}
function onResetUserInfo(){
  setDefaultUserInfo()
}

//password
const isChangePassword = ref(false)
const profilePassword = ref(null)
const changePasswordModel = ref({
  old_password: '',
  new_password: '',
  new_password_confirmation: '',
})
function onSubmitPassword(){
  openDialogConfirm({
    title: t(`${TRANC_PREFIX}.change_password_confirm.title`),
    text: t(`${TRANC_PREFIX}.change_password_confirm.text`),
    func: changePasswordAsync,
    funcParams: changePasswordModel.value,
    callbackFunc: changePasswordCallback
  })
}
function onResetPassword(){
  changePasswordModel.value.old_password = ''
  changePasswordModel.value.new_password = ''
  changePasswordModel.value.new_password_confirmation = ''
}
function changePasswordCallback(result){
  if(result){
    showInfoMassage(t(`${TRANC_PREFIX}.change_password_confirm.success`))
    onResetPassword()
    profilePassword.value.resetValidation()
    isChangePassword.value = false
  }
}
</script>

<template>
  <personal-template :is-empty="false">
    <template v-slot:personal-content>
      <div class="row justify-around items-start">
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
                class="border-shadow q-ma-lg">
          <q-bar style="background-color: #e3e1c9">
            <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.about_my`) }}</span>
            <q-space/>
          </q-bar>
          <q-form @submit="onSubmitUserInfo"
                  @reset="onResetUserInfo"
                  class="my-bg-color"
                  ref="profileUserInfo"
          >
            <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
              <q-input
                  :readonly="!isChangeInfo"
                  class="q-my-xs input-field"
                  color="light-green-8"
                  type="text"
                  name="first_name"
                  v-model="modelUserInfo.first_name"
                  :label="t(`${TRANC_PREFIX}.name`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.name`))
              ]"
              />
              <q-input
                  :readonly="!isChangeInfo"
                  class="q-my-xs input-field"
                  color="light-green-8"
                  type="text"
                  name="last_name"
                  v-model="modelUserInfo.last_name"
                  :label="t(`${TRANC_PREFIX}.surname`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.surname`))
              ]"
              />
              <q-input
                  :readonly="!isChangeInfo"
                  class="q-my-xs input-field"
                  color="light-green-8"
                  type="text"
                  name="last_name"
                  v-model="modelUserInfo.phone"
                  :label="t(`${TRANC_PREFIX}.phone`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.surname`))
              ]"
              />
              <q-input
                  readonly
                  class="q-my-xs input-field"
                  color="light-green-8"
                  name="email"

                  v-model="modelUserInfo.email"
                  :label="t(`${TRANC_PREFIX}.email`)"
              />
            </q-card-section>
            <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #e3e1c9">
              <q-btn v-show="!isChangeInfo"
                     @click="isChangeInfo = !isChangeInfo"
                     flat
                     class="q-mr-sm"
                     icon="edit"/>
              <q-btn v-show="isChangeInfo"
                     @click="isChangeInfo = !isChangeInfo"
                     flat
                     color="red"
                     type="reset"
                     class="q-mr-sm"
                     icon="close"/>
              <q-btn v-show="isChangeInfo" type="reset"  flat class="q-mr-sm" icon="refresh"/>
              <q-btn v-show="isChangeInfo" type="submit" color="light-green-8" flat icon="done"/>
            </q-card-actions>
          </q-form>
        </q-card>
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
                class="border-shadow q-ma-lg">
          <q-bar style="background-color: #e3e1c9;">
            <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.change_password`) }}</span>
            <q-space/>
          </q-bar>
          <q-form @submit="onSubmitPassword"
                  @reset="onResetPassword"
                  class="my-bg-color"
                  ref="profilePassword"
          >
            <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
              <q-input
                  :readonly="!isChangePassword"
                  class="q-my-xs input-field"
                  counter
                  maxlength="8"
                  color="light-green-8"
                  type="password"
                  name="password"
                  v-model="changePasswordModel.old_password"
                  :label="t(`${TRANC_PREFIX}.old_password`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.old_password`)),
                  rules.lengthMoreOrEqual(8),
              ]"
              />
              <q-input
                  :readonly="!isChangePassword"
                  class="q-my-xs input-field"
                  counter
                  maxlength="8"
                  color="light-green-8"
                  type="password"
                  name="password"
                  v-model="changePasswordModel.new_password"
                  :label="t(`${TRANC_PREFIX}.new_password`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.new_password`)),
                  rules.lengthMoreOrEqual(8),
              ]"
              />
              <q-input
                  :readonly="!isChangePassword"
                  class="q-my-xs input-field"
                  counter
                  maxlength="8"
                  color="light-green-8"
                  type="password"
                  name="new_password"
                  v-model="changePasswordModel.new_password_confirmation"
                  :label="t(`${TRANC_PREFIX}.confirm_new_password`)"
                  :rules="[
                  rules.required(t(`${TRANC_PREFIX}.confirm_new_password`)),
                  rules.lengthMoreOrEqual(8),
                  rules.confirmField(changePasswordModel.new_password,t(`${TRANC_PREFIX}.new_password`)),
              ]"
              />
            </q-card-section>
            <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #e3e1c9">
              <q-btn v-show="!isChangePassword"
                     @click="isChangePassword = !isChangePassword"
                     flat
                     class="q-mr-sm"
                     icon="edit"/>
              <q-btn v-show="isChangePassword"
                     @click="isChangePassword = !isChangePassword"
                     flat
                     type="reset"
                     color="red"
                     class="q-mr-sm"
                     icon="close"/>
              <q-btn v-show="isChangePassword" type="reset"  flat class="q-mr-sm" icon="refresh"/>
              <q-btn v-show="isChangePassword" type="submit" color="light-green-8" flat icon="done"/>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>
    </template>
  </personal-template>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>