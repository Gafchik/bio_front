<script setup>
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const appStore = useAppStore()
const {} = appStore
const {regDialog} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.auth'
const model = ref({
  name: '',
  surname: '',
  phone: '',
  email: '',
  password: '',
  repeat_password: '',
})
function closeDialog(){
  regDialog.value = false
  model.value = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    repeat_password: '',
  }
}
function onSubmit() {

}

function onReset() {
  model.value = {
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    repeat_password: '',
  }
}
</script>

<template>
  <q-dialog v-model="regDialog" persistent>
    <q-card :style="$q.platform.is.desktop ? 'width: 30%;' : 'width: 80%;'">
      <q-bar class="row items-center q-pb-none" style="background-color: #e3e1c9">
        <div class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.reg`) }}</div>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="light-green-8"/>
      </q-bar>
      <q-form style="background-color: #e3e1c9"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
      >
        <q-card-section>
          <q-input
              class="q-my-xs"
              filled
              color="light-green-8"
              type="text"
              v-model="model.name"
              :label="t(`${TRANC_PREFIX}.name`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
              class="q-my-xs"
              color="light-green-8"
              filled
              type="text"
              v-model="model.surname"
              :label="t(`${TRANC_PREFIX}.surname`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
              class="q-my-xs"
              color="light-green-8"
              filled
              type="text"
              v-model="model.phone"
              :label="t(`${TRANC_PREFIX}.phone`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
              class="q-my-xs"
              color="light-green-8"
              filled
              type="email"
              v-model="model.email"
              :label="t(`${TRANC_PREFIX}.email`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
              class="q-my-xs"
              color="light-green-8"
              filled
              type="password"
              v-model="model.password"
              :label="t(`${TRANC_PREFIX}.password`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
              class="q-my-xs"
              color="light-green-8"
              filled
              type="password"
              v-model="model.repeat_password"
              :label="t(`${TRANC_PREFIX}.repeat_password`)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
      </q-card-section>
        <q-separator/>
        <q-card-actions class="row justify-end" style="background-color: #e3e1c9">
        <q-btn type="reset"  flat class="q-mr-sm" icon="refresh"/>
        <q-btn type="submit" color="light-green-8" flat icon="done"/>
      </q-card-actions>
      </q-form>
    </q-card>
    <!--      <q-input-->
    <!--          filled-->
    <!--          v-model="name"-->
    <!--          label="Your name *"-->
    <!--          hint="Name and surname"-->
    <!--          lazy-rules-->
    <!--          :rules="[ val => val && val.length > 0 || 'Please type something']"-->
    <!--      />-->

    <!--      <q-input-->
    <!--          filled-->
    <!--          type="number"-->
    <!--          v-model="age"-->
    <!--          label="Your age *"-->
    <!--          lazy-rules-->
    <!--          :rules="[-->
    <!--          val => val !== null && val !== '' || 'Please type your age',-->
    <!--          val => val > 0 && val < 100 || 'Please type a real age'-->
    <!--        ]"-->
    <!--      />-->

    <!--      <q-toggle v-model="accept" label="I accept the license and terms" />-->

    <!--      <div>-->
    <!--        -->
    <!--      </div>-->

  </q-dialog>
</template>

<style scoped>

</style>