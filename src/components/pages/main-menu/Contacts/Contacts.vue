<script setup>

import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
import {useAppStore} from "@/store/app-store.js";
import facebook from "@/components/common/SocioalIcons/FacebookIcon.vue";
import instagram from "@/components/common/SocioalIcons/InstagramIcon.vue";
import messenger from "@/components/common/SocioalIcons/FacebookMessengerIcon.vue";
import telegram from "@/components/common/SocioalIcons/TelegramIcon.vue";
import viber from "@/components/common/SocioalIcons/ViberIcon.vue";
const {t} = useI18n()
const contactsStore = useContactsStore()
const {getContactsAsync} = contactsStore
const {contacts} = storeToRefs(contactsStore)
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const TRANC_PREFIX = 'pages.contacts'
getContactsAsync()

</script>

<template>
  <div class="q-ml-xl">
    <div class="q-mb-xl text-bold text-h6 text-green-8">
      {{t(`${TRANC_PREFIX}.contacts`)}}
    </div>
    <div class="q-mb-md text-bold text-green-8">
      {{t(`${TRANC_PREFIX}.company_address`)}}
    </div>
    <div class="row">
      <div class="q-mr-lg"  v-for="contact in contacts['0']">
        <span v-html="contact.locale[currentLocale]?.address ?? ''"/>
      </div>
    </div>

    <div class="row q-my-md">
      <div class="q-mr-lg q-my-md" v-for="contact in contacts['1']">
        <div>
          <span class="text-bold">{{contact.locale[currentLocale]?.title ?? ''}}</span>
        </div>
        <div class="q-my-sm">
          <q-icon name="call" class="q-mr-xs"/>
          <a :href="'tel:'+contact?.phone ?? ''">{{contact?.phone ?? ''}}</a>
        </div>
        <div>
          <q-icon  name="mail" class="q-mr-xs"/>
          <a :href="'mailto:'+contact?.email ?? ''">{{contact?.email ?? ''}}</a>
        </div>
      </div>
    </div>
    <div class="q-mb-md text-bold text-green-8">
      {{t(`${TRANC_PREFIX}.department_contacts`)}}
    </div>
    <div class="row q-my-md">
      <div class="q-mr-lg q-my-md" v-for="contact in contacts['2']">
        <div class="q-my-sm">
          <span class="text-bold">{{contact.locale[currentLocale]?.title ?? ''}}</span>
        </div>
        <div class="q-my-sm">
          <q-icon  name="mail" class="q-mr-xs"/>
          <a :href="'mailto:'+contact?.email ?? ''">{{contact?.email ?? ''}}</a>
        </div>
      </div>
    </div>

    <div class="q-mb-md text-bold text-green-8">
      {{t(`${TRANC_PREFIX}.social_networks`)}}
    </div>
    <div class="row q-my-md">
        <div  v-for="contact in contacts['3']">
          <component class="q-mx-sm"
              v-bind:is="contact.social_type"
              :url="contact.url"
              width="2em"
              height="2em"/>
        </div>
    </div>
  </div>
</template>

<style scoped>
a{
  color: black;
  text-decoration: none;
}
</style>