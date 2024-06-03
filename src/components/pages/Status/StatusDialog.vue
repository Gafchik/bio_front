<script setup>
import {useStatusStore} from "@/store/pages/Status/status.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const TRANC_PREFIX = 'pages.status'
const statusStore = useStatusStore()
const {dialog} = storeToRefs(statusStore)
const {closeDialog} = statusStore
const {t} = useI18n()
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card :style="$q.platform.is.desktop
      ? 'width: 30%; background-color: #e3e1c9 !important'
      : 'width: 90%; background-color: #e3e1c9 !important'">
      <q-bar class="row items-center q-pb-none" style="background-color: #b8b398">
        <span class="text-h6 text-light-green-8">{{ t(`${TRANC_PREFIX}.dialog.title`) }}</span>
        <q-space/>
        <q-btn
            @click="closeDialog"
            icon="close"
            flat
            color="light-green-8"/>
      </q-bar>
      <q-card-section :class="$q.platform.is.desktop ? 'q-px-xl ': ''">
        <div class="text-center">
          <div>{{t(`${TRANC_PREFIX}.dialog.text_1`)}}</div>
          <div>{{t(`${TRANC_PREFIX}.dialog.text_2`)}}</div>
          <div>
            <router-link
                target= '_blank'
                :to="{ name: 'faq', query: { category:12,item:66 }}"
                class="text-light-green-8">
                {{t(`${TRANC_PREFIX}.dialog.linc_buy`)}}
            </router-link>

          </div>
          <div>
            <router-link
                target= '_blank'
                :to="{ name: 'faq', query: { category:12,item:66 }}"
                class="text-light-green-8">
                  {{t(`${TRANC_PREFIX}.dialog.linc_faq`)}}
            </router-link>
          </div>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>