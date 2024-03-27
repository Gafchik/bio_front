<script setup>
import {useNewsStore} from "@/store/pages/News/news-store.js";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted, ref} from "vue";
import {onScrollToLastItem} from "@/event-listener/event-listener.js";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const newsStore = useNewsStore()
const {getNewsInfoAsync} = newsStore
const {newsCards,cardPage} = storeToRefs(newsStore)
newsCards.value = []
cardPage.value = 1
getNewsInfoAsync()

onMounted(() => {
  window.addEventListener(
      'scroll',
      () => onScrollToLastItem('#newsCards .q-card:last-child',getNewsInfoAsync)
  );
});

onUnmounted(() => {
  window.removeEventListener(
      'scroll',
      () => onScrollToLastItem('#newsCards .q-card:last-child',getNewsInfoAsync)
  );
});
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 20%' : 'margin-inline: 5%'"
       class="items-center"
       id="newsCards">
    <q-card class="q-my-lg" v-for="card in newsCards">
      <q-img fit="fill" style="height: 320px;" :src="card.image"/>

      <q-card-section>
        <div class="text-h6 text-light-green-8" v-html="card['name_'+currentLocale]"/>
        <div class="text-subtitle2" v-html="card['short_content_'+currentLocale]"/>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-icon size="xs" name="visibility" class="text-light-green-8"/>
        <span class="text-light-green-8 q-mx-lg">{{card.view_count}}</span>
        <q-space/>
        <span class="text-light-green-8 q-mx-lg">{{card.date}}</span>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>

</style>