<script setup>

import UserDisplay from "@/components/common/UserDisplay.vue";
</script>

<template>
  <div :class="$q.platform.is.desktop ? 'row' : ''">
    <div :class="$q.platform.is.desktop ? 'col-3' : ''">
      <user-display/>
    </div>
    <div :class="$q.platform.is.desktop ? 'col-9 q-pa-lg' : 'q-pa-lg'">
      <slot name="personal-content" class=""></slot>
    </div>
  </div>
</template>

<style scoped>

</style>