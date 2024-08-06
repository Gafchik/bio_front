<script setup>
import {useContactsStore} from "@/store/pages/Contacts/contacts-store.js";
import {storeToRefs} from "pinia";

const contactsStore = useContactsStore()
const {getContactsAsync} = contactsStore
const {contacts} = storeToRefs(contactsStore)
getContactsAsync()
</script>

<template>
<!--  <q-footer reveal elevated style="background: #ccc9a5">-->
  <q-footer reveal elevated style="background: #f5f3e4">
    <q-toolbar v-if="$q.platform.is.desktop" class="text-black row justify-between">
      <div></div>
      <div>
        <span id="rights-reserved" class="q-mt-lg text-bold" style="font-size: 12px;">
          2018 Olive project. All rights reserved
        </span>
      </div>
      <div>
        <component class="q-mx-none" v-for="contact in contacts['3']"
                   v-bind:is="contact.social_type"
                   :url="contact.url"
                   width="2em"
                   height="2em"/>
      </div>
    </q-toolbar>
    <div v-else class="text-black fit column items-center q-pt-sm">
      <div>
        <component class="q-mx-sm" v-for="contact in contacts['3']"
                   v-bind:is="contact.social_type"
                   :url="contact.url"
                   width="2em"
                   height="2em"/>
      </div>
      <div class="q-pt-sm">
        <span class="text-center text-bold" style="font-size: 12px;">
          2018 Olive project. All rights reserved
        </span>
      </div>
    </div>
  </q-footer>
</template>
<style>
#rights-reserved {
  position: absolute;
  bottom: 0;
}
</style>