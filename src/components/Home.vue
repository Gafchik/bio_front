<script setup>
import {computed, ref} from 'vue'
import {useI18n} from "vue-i18n";
import {useHomeStore} from "@/store/pages/Home/home-store.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const TRANC_PREFIX = 'pages.home'
const homeStore = useHomeStore()
const {getHomePageInfo} = homeStore
const {homeInfo} = storeToRefs(homeStore)
const videoSlide = ref(1)
getHomePageInfo().then(() => {
  videoSlide.value =  homeInfo.value.videos[0].id
})
const display = ref(null)
const displayHeight = computed(() => {
  return display.value ? display.value.offsetHeight : 0;
})
</script>

<template>
  <div>
    <div class="row justify-around q-mt-lg">
      <q-carousel
          :class="$q.platform.is.desktop
        ? 'linc_desktop q-pr-xl border-shadow'
        : 'linc_mobile q-mb-lg border-shadow'"
          v-model="videoSlide"
          control-type="push"
          animated
          arrows
          control-color="light-green-8"
          :height="displayHeight+'px'"
          :navigation="false">
        <q-carousel-slide v-for="item in homeInfo.videos" :key="item.id" :name="item.id">
          <q-video
              class="absolute-full"
              :src="item.video"
          />
        </q-carousel-slide>
      </q-carousel>
      <q-card  class="no-border-no-shadow" style="background-color: rgba(0, 0, 0, 0.0)">
          <q-list >
            <div ref="display">
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="forest" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.all_count_trees`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.all_count_trees}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.price_to_liter`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.price_to_liter+'$'}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="payments" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.tree_all_price`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.tree_all_price+'$'}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="handshake" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.count_transactions`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.count_transactions}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="park" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.count_yong_trees`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.count_yong_trees}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="background-color: #f5f3e4" class="outlined-item  q-mb-sm">
                <q-item-section avatar>
                  <q-icon color="light-green-8" name="group" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{t(`${TRANC_PREFIX}.count_users`)}}
                    <span class="text-light-green-8 text-bold">{{homeInfo.count_users}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>

          </q-list>
        </q-card>
    </div>
    <div :class="$q.platform.is.desktop ? 'row justify-center q-mt-xl' : 'column wrap justify-center items-center q-mt-lg'">
      <q-btn
          class="pulse-animation q-my-lg"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
          icon="mdi-basket-outline"
          color="green-8"
          rounded
          :label="t(`${TRANC_PREFIX}.buy_tree_btn`)" />
      <q-btn
          class=" pulse-animation q-mx-xl q-my-lg"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
          icon="mdi-gift-outline"
          color="green-8"
          rounded
          :label="t(`${TRANC_PREFIX}.gift_tree_btn`)" />
      <q-btn
          class="pulse-animation q-my-lg"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
          rounded
          icon="question_mark"
          color="green-8"
          :label="t(`${TRANC_PREFIX}.help_btn`)" />
    </div>
    <div :style="$q.platform.is.desktop ? 'margin-inline: 10%' : 'margin-inline: 5%'"
         class="items-center q-my-lg">
      <div class="text-left text-bold text-h6 text-green-8 q-my-lg">
        {{t(`${TRANC_PREFIX}.last_news`)}}
      </div>
      <router-link
          :to="{ name: 'news_detail', params: { id: homeInfo.first_news.id_card }}"
          class="link-no-underline">
        <q-card class="border-shadow">
          <q-card-section style="background-color: #f0edce">
            <div class="text-h6 text-light-green-8 inner-image" v-html="homeInfo.first_news['name_'+currentLocale]"/>
            <div class="text-subtitle2 text-grey-10 inner-image" v-html="homeInfo.first_news['short_content_'+currentLocale]"/>
          </q-card-section>
          <q-separator />

          <q-card-actions align="center" style="background-color: #f0edce">
            <q-icon size="xs" name="visibility" class="text-light-green-8"/>
            <span class="text-light-green-8 q-mx-lg">{{homeInfo.first_news.view_count}}</span>
            <q-space/>
            <span id="triggerEvent" class="text-light-green-8 q-mx-lg">{{homeInfo.first_news.date}}</span>
          </q-card-actions>
        </q-card>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
.linc_mobile {
  width: 335px;
  height: 275px;
}
.linc_desktop {
  width: 800px;
}
.outlined-item {
  border-radius: 50px; /* Округление углов */
  padding: 10px; /* Добавление отступов внутри элемента */
  background-color: white;
  box-shadow: 1px 1px 20px #181f04;
}

</style>
