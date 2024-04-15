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
    <q-btn flat rounded size="lg">
      <svg :width="width" :height="height" viewBox="0 0 24 24">
        <g fill="none" stroke="#1cb5fc" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"><path d="M18 8L5 12.5L9.5 14M18 8l-8.5 6M18 8l-4 10.5L9.5 14"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/>
        </g>
      </svg>
    </q-btn>
  </a>
</template>
