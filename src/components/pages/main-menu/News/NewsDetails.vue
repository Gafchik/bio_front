<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {useRoute} from "vue-router";
import {useNewsStore} from "@/store/pages/News/news-store.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const newsStore = useNewsStore()
const {getNewsDetails,addView} = newsStore
const {newsDetail} = storeToRefs(newsStore)
const TRANC_PREFIX = 'pages.news'
const route = useRoute();
import router from "@/routes/router.js";

if(!!route.params.id){
  getNewsDetails(route.params.id).then((res) => {
    if(!!res){
      addView(route.params.id)
    }
  })
}else{
  router.push({ name: 'not_found' });
}
</script>

<template>
<div :class=" $q.platform.is.desktop ? 'q-px-xl q-mb-lg' : 'q-px-lg q-mb-lg'">
  <div class="text-left text-bold  q-mt-md text-light-green-8 text-h6">
    {{t(`${TRANC_PREFIX}.details.title`)}}
  </div>
  <div class="q-mb-lg" style="font-size: 9pt">{{newsDetail.date}}</div>
  <q-card class="my-card" style="background-color: rgba(255, 255, 255, 0.5); ">
    <div class="text-center">
      <q-img
          class="q-px-lg"
          fit="fill"
          :style="$q.platform.is.desktop ? 'height: 400px; width: 80%;' : 'height: 200px;'"
          :src="newsDetail.image"/>
    </div>

    <q-card-section>
      <div class="text-h6">{{newsDetail['name_'+currentLocale]}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="inner-image" v-html="newsDetail['content_'+currentLocale]"/>
    </q-card-section>
  </q-card>
</div>
</template>

<style scoped>
@import "@sass/common-style.css";
.my-card {
  box-shadow: unset;
}
</style>
