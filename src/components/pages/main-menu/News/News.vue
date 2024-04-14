<script setup>
import {useNewsStore} from "@/store/pages/News/news-store.js";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {onScrollToLastItem} from "@/event-listener/event-listener.js";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const newsStore = useNewsStore()
const {getNewsInfoAsync} = newsStore
const {newsCards,cardPage,isAllNews} = storeToRefs(newsStore)
newsCards.value = []
cardPage.value = 1
getNewsInfoAsync()
function handleScroll() {
  onScrollToLastItem('#newsCards .link-no-underline:last-child', getNewsInfoAsync);
}
onMounted(() => {
  window.addEventListener('scroll',handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(isAllNews, async (newValue, oldValue) => {
  if (newValue) {
    window.removeEventListener('scroll', handleScroll);
  }
})
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 20%' : 'margin-inline: 5%'"
       class="items-center"
       id="newsCards">
    <router-link
        v-for="card in newsCards"
        :to="{ name: 'news_detail', params: { id: card.id_card }}"
        class="link-no-underline">
      <q-card class="q-my-lg">
        <q-img
            fit="fill"
            :style="$q.platform.is.desktop ? 'height: 320px' : 'height: 200px'"
            :src="card.image"/>

        <q-card-section>
          <div class="text-h6 text-light-green-8 inner-image" v-html="card['name_'+currentLocale]"/>
          <div class="text-subtitle2 text-grey-10 inner-image" v-html="card['short_content_'+currentLocale]"/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="center">
          <q-icon size="xs" name="visibility" class="text-light-green-8"/>
          <span class="text-light-green-8 q-mx-lg">{{card.view_count}}</span>
          <q-space/>
          <span id="triggerEvent" class="text-light-green-8 q-mx-lg">{{card.date}}</span>
        </q-card-actions>
      </q-card>
    </router-link>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>