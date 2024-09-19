<script setup>
import messenger from "@/components/common/SocioalIcons/FacebookMessengerIcon.vue";
import telegram from "@/components/common/SocioalIcons/TelegramIcon.vue";
import viber from "@/components/common/SocioalIcons/ViberIcon.vue";
import {useQuestionStore} from "@/store/common/question-store.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
import rules from "@/rules/rules.js";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const T_PREFIX = 'common.question'
const questionStore = useQuestionStore()
const {closeQuestionDialog,sendQuestionAsync} = questionStore
const {questionDialog} = storeToRefs(questionStore)
const appStore = useAppStore()
const {getUserInfo,showInfoMassage} = appStore
getUserInfo().then(() => {
  if(isLogin.value){
    payload.value.name = userInfo.value.first_name + ' ' + userInfo.value.last_name
    payload.value.email = userInfo.value.email
  }
})
const {isLogin,userInfo} = storeToRefs(appStore)
const questionForm = ref(null)
const payload = ref({
  email: '',
  name: '',
  question: '',
})

function onSubmit(){
  sendQuestionAsync(payload.value)
      .then((res) => {
        if(res){
          payload.value = {
            email: '',
            name: '',
            question: '',
          }
          closeQuestionDialog()
          showInfoMassage(t(`${T_PREFIX}.success`))
        }
      })
}
const socialBtn = {
  messenger: messenger,
  telegram: telegram,
  viber: viber,
}

</script>

<template>
  <q-dialog v-model="questionDialog">
    <q-card :style="$q.platform.is.desktop ? 'background-color: #f5f3e4; width: 60%' :'background-color: #f5f3e4; min-width: 100%'">
      <q-bar class="text-black row items-center justify-center text-center content-center`" style="height: auto">
        <span class="text-h5 text-light-green-8">{{ t(`${T_PREFIX}.title`) }}</span>
        <q-space/>
        <q-btn flat icon="close" color="light-green-8" @click="closeQuestionDialog"/>
      </q-bar>
      <q-form style="background-color: #f5f3e4"
              @submit="onSubmit"
              class="q-gutter-md"
              ref="questionForm"
      >
        <q-card-section>
          <div class="text-bold q-px-lg text-center">
            {{t(`${T_PREFIX}.text_1`)}}
          </div>
          <div class="row justify-center">
            <div>
              <component class="q-mx-sm"
                         v-bind:is="socialBtn.messenger"
                         url="https://m.me/104947177543675?ref=nzhe6JcvZw0cJhy0_"
                         width="3em"
                         target="_blank"
                         height="3em"/>
            </div>
            <div>
              <component class="q-mx-sm"
                         v-bind:is="socialBtn.telegram"
                         url="https://telegram.me/BiodepositBot?start=5e344e1ad31ff6000cb51880"
                         width="3em"
                         target="_blank"
                         height="3em"/>
            </div>
            <div>
              <component class="q-mx-sm"
                         v-bind:is="socialBtn.viber"
                         url="viber://pa?chatURI=biodeposit_bot&context=5e344e1ad31ff6000cb51880/"
                         width="3em"
                         target="_blank"
                         height="3em"/>
            </div>
          </div>
          <div class="text-bold q-px-lg text-center q-mt-sm">
            {{t(`${T_PREFIX}.text_2`)}}
          </div>
          <div>
            <div :class="$q.platform.is.desktop ? 'row justify-between q-px-xl' : 'row justify-center'" v-if="!isLogin">
              <q-input
                  class="input-field"
                  color="light-green-8"
                  type="text"
                  name="name"
                  v-model="payload.name"
                  :label="t(`${T_PREFIX}.name`)"
                  :rules="[
                  rules.required(t(`${T_PREFIX}.name`))
              ]"
              />
              <q-input
                  ref="inputEmailReg"
                  class="input-field"
                  color="light-green-8"
                  name="email"
                  v-model="payload.email"
                  :label="t(`${T_PREFIX}.email`)"
                  :rules="[
                  rules.required(t(`${T_PREFIX}.email`)),
                  rules.email(),
              ]"
              />
            </div>
            <div class="q-px-xl">
              <q-input
                  class="input-field"
                  color="light-green-8"
                  type="textarea"
                  name="question"
                  v-model="payload.question"
                  :label="t(`${T_PREFIX}.question`)"
                  maxlength="500"
                  counter
                  :rules="[
                  rules.required(t(`${T_PREFIX}.question`))
              ]"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
              class="glossy q-mt-sm"
              unelevated
              rounded
              :size="$q.platform.is.desktop ? 'xl' : 'lg'"
              type="submit"
              color="light-green-8"
              :label="t(`${T_PREFIX}.submit`)"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>