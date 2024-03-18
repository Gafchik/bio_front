<script setup>

import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
const {t} = useI18n()
const contactsStore = useContactsStore()
const {getContactsAsync} = contactsStore
const {contacts} = storeToRefs(contactsStore)
const TRANC_PREFIX = 'pages.contacts'
getContactsAsync()
</script>

<template>
  <div>
    <div v-for="contact in contacts">
      <div>{{contact.id}}</div>
    </div>
  </div>
</template>

<style scoped>

</style>