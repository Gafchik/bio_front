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
const {getUserInfo,showInfoMassage,checkHas2Fa,copyToClipboardNotify,enable2Fa,disable2Fa} = appStore
checkHas2Fa()
const {userInfo,axios,google2fa} = storeToRefs(appStore)
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
const code2fa = ref(null)
const twoFaInfoDialog = ref(false)
function onSubmit2fa(){
    if(!google2fa.value.enable_2_fact){
      enable2Fa({code:code2fa.value})
    }else{
      disable2Fa({code:code2fa.value})
    }
  code2fa.value = null
}
function getAndroid(){
  return `<a target="_blank" style="color:green" href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl">Android</a>`
}
function getIPhoned(){
  return `<a target="_blank" style="color:green" href="https://apps.apple.com/us/app/google-authenticator/id388497605">Authy</a>`
}
function getAuthy(){
  return `<a target="_blank" style="color:green" href="https://authy.com/download/">Android</a>`
}
function getHear(){
  return `<a target="_blank" style="color:green" href="https://www.youtube.com/results?search_query=google+authy+%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%82%D0%BE%D1%80">`+t(`${TRANC_PREFIX}.hear`)+`</a>`
}
function getKeePassXC(){
  return `<a target="_blank" style="color:green" href="https://keepassxc.org/">KeePassXC</a>`
}
</script>

<template>
  <personal-template :is-empty="false">
    <template v-slot:personal-content>
      <div class="row justify-around items-start">
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 95%;'"
                class="border-shadow q-ma-sm">
          <q-bar style="background-color: #e3e1c9; height: auto">
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
        <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 95%;'"
                class="border-shadow q-ma-sm">
          <q-bar style="background-color: #e3e1c9;; height: auto">
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
        <q-card :style="$q.platform.is.desktop ? 'max-width: 33%; min-width: 30%;': 'min-width: 95%;'"
                class="border-shadow q-ma-sm">
          <q-bar style="background-color: #e3e1c9; height: auto">
            <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.2fa`) }}</span>
            <q-space/>
            <q-btn @click="() => twoFaInfoDialog = true" color="light-green-8" flat icon="question_mark"/>
          </q-bar>
          <q-form @submit="onSubmit2fa"
                  class="my-bg-color"
                  ref="profilePassword"
          >
            <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl': ''">
              <div class="text-right">

              </div>
              <div v-show="!google2fa.enable_2_fact">
                <q-input
                    :label="t(`${TRANC_PREFIX}.key`)"
                    v-model="google2fa.key"
                    readonly
                    :input-style="{ color: 'green' }"
                >
                  <template v-slot:after>
                    <q-btn
                        @click="copyToClipboardNotify(google2fa.key)"
                        round
                        color="light-green-8"
                        dense
                        flat
                        icon="content_copy" />
                  </template>
                </q-input>
                <div class="text-center q-mt-sm">
                  <q-img
                      :src="google2fa.qr"
                      spinner-color="white"
                      style="height: 150px; max-width: 150px"
                  />
                </div>
              </div>
              <div v-show="google2fa.enable_2_fact">
                <div>
                  <q-icon name="done" size="md" color="light-green-8"/>
                  <span>{{' '+t(`${TRANC_PREFIX}.two_fa_enable`)}}</span>
                  <br>
                  <span>{{' '+t(`${TRANC_PREFIX}.two_fa_enable2`)}}</span>
                </div>
              </div>
              <q-input
                  :label="t(`${TRANC_PREFIX}.input_code`)"
                  label-color="light-green-9"
                  color="light-green-9"
                  v-model="code2fa"
              />
            </q-card-section>
            <q-card-actions class="row justify-end q-pa-none q-ma-none" style="background-color: #e3e1c9">
              <q-btn  type="submit" color="light-green-8" flat icon="done"/>
            </q-card-actions>
          </q-form>
        </q-card>
        <q-dialog v-model="twoFaInfoDialog">
          <q-card style="background-color: #e3e1c9">
            <q-card-section class="q-pt-none">
              <span>{{t(`${TRANC_PREFIX}.2fa_info_1`)}}</span>
              <br><br>
              <span>{{t(`${TRANC_PREFIX}.2fa_info_2`)}}</span>
              <br><br>
              <br><br>
              <span v-html="t(`${TRANC_PREFIX}.2fa_info_3`,{
                Android: getAndroid(),
                iPhone: getIPhoned(),
                Authy: getAuthy(),
                hear: getHear(),
              })"></span>
              <br><br>
              <span v-html="t(`${TRANC_PREFIX}.2fa_info_4`,{
                KeePassXC: getKeePassXC(),
              })"></span>
              <span>{{t(`${TRANC_PREFIX}.2fa_info_5`)}}</span>
              <br><br>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat icon="done" color="light-green-8" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </template>
  </personal-template>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>