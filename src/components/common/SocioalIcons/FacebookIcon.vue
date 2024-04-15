<script setup lang="ts">
import { defineComponent } from 'vue';
const props = defineProps({
  width: {
    default: '1em',
    required: true,
    type: String
  },
  height: {
    default: '1em',
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
  name: 'facebook',
});
</script>
<template>
  <a :href="url">
    <q-btn flat rounded size="lg">
      <svg :width="width" :height="height" viewBox="-2 -1.5 17 17">
        <path fill="none" :stroke="hash" stroke-linecap="round" stroke-linejoin="round" d="M.5 12.5v-11a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-3V8.76h.71a.61.61 0 0 0 .61-.61v-.77a.611.611 0 0 0-.61-.61h-.67v-.94c0-.84.38-.84.76-.84h.49a.55.55 0 0 0 .43-.18a.58.58 0 0 0 .18-.43v-.74a.618.618 0 0 0-.6-.64H9.65a2.32 2.32 0 0 0-2.39 2.6v1.17h-.64a.61.61 0 0 0-.62.61v.77a.61.61 0 0 0 .62.61h.64v4.74H1.5a1 1 0 0 1-1-1" />
      </svg>
    </q-btn>
  </a>
</template>
