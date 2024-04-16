<script setup lang="ts">
import { defineComponent } from 'vue';
const props = defineProps({
  width: {
    default: '1.2em',
    required: true,
    type: String
  },
  height: {
    default: '1.2em',
    required: true,
    type: String
  },
  hash: {
    default: '#0005a3',
    required: true,
    type: String
  },
  url: {
    default: '',
    required: true,
    type: String
  }
})
defineComponent({
  name: 'FacebookMessengerIcon',
});
</script>
<template>
  <a :href="url">
    <q-btn flat rounded >
      <svg :width="width" :height="height" viewBox="0 0 24 24">
        <path :fill="hash" d="m14.777 14.038l2.65-3.92c.262-.386-.235-.805-.615-.529l-2.858 2.015a.571.571 0 0 1-.652 0l-2.116-1.477c-.633-.437-1.538-.277-1.963.335l-2.65 3.92c-.262.386.235.806.615.529l2.858-2.015a.571.571 0 0 1 .652 0l2.116 1.452c.633.462 1.538.302 1.963-.31"/>
        <path :fill="hash" fill-rule="evenodd" d="M12 2.25A9.75 9.75 0 0 0 2.25 12a9.724 9.724 0 0 0 3 7.036V21.5a.75.75 0 0 0 .987.712l2.78-.927A9.745 9.745 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M3.75 12a8.25 8.25 0 1 1 5.516 7.787a.75.75 0 0 0-.486-.004l-2.03.676v-1.75a.75.75 0 0 0-.25-.56A8.228 8.228 0 0 1 3.75 12" clip-rule="evenodd"/>
      </svg>
    </q-btn>
  </a>
</template>
