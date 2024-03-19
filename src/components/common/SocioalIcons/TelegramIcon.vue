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
    default: '#2f81f5',
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
  name: 'TelegramIcon',
});
</script>
<template>
  <a :href="url">
    <svg :width="width" :height="height" viewBox="0 0 24 24">
      <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" :fill="hash" />
    </svg>
  </a>
</template>
