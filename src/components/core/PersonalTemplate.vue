<script setup>
import UserDisplay from "@/components/common/UserDisplay.vue";
import EmptyPersonalPage from "@/components/core/EmptyPersonalPage.vue";

const props = defineProps({
  isEmpty: {
    type: Boolean,
    default: true,
    required: true
  },
  emptyText: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <div :class="$q.platform.is.desktop ? 'row' : ''">
    <div :class="$q.platform.is.desktop ? 'col-3' : ''">
      <user-display/>
    </div>
    <div :class="$q.platform.is.desktop ? 'col-9 q-pa-lg' : 'q-pa-lg'">
      <empty-personal-page v-if="props.isEmpty" :emptyText="props.emptyText"/>
      <slot v-else name="personal-content" class=""></slot>
    </div>
  </div>
</template>

<style scoped>

</style>