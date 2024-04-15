<script setup>
import { ref } from 'vue'
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
</script>

<template>
  <div>
    <div class="row justify-around q-mt-lg">
      <q-carousel
          :class="$q.platform.is.desktop
        ? 'linc_desktop rounded-borders q-mb-lg q-pr-xl'
        : 'linc_mobile rounded-borders q-mb-lg'"
          v-model="videoSlide"
          control-type="push"
          animated
          arrows
          control-color="light-green-8"
          :navigation="false"
          height="300px">
        <q-carousel-slide v-for="item in homeInfo.videos" :key="item.id" :name="item.id">
          <q-video
              class="absolute-full"
              :src="item.video"
          />
        </q-carousel-slide>
      </q-carousel>
      <div>
        <q-card class="no-border-no-shadow" style="background-color: rgba(0, 0, 0, 0.0)">
          <q-list>
            <q-item class="outlined-item  q-mb-sm q-mb-sm">
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

            <q-item class="outlined-item  q-mb-sm">
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

            <q-item class="outlined-item  q-mb-sm">
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

            <q-item class="outlined-item  q-mb-sm">
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

            <q-item class="outlined-item  q-mb-sm">
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

            <q-item class="outlined-item  q-mb-sm">
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
          </q-list>
        </q-card>
      </div>
    </div>
    <div
        :class="$q.platform.is.desktop ? 'row q-mb-sm' : 'row justify-center q-mb-sm'"
        :style="$q.platform.is.desktop ? 'margin-left: 5%': ''">
      <div :class="$q.platform.is.desktop ? 'col-7': 'col-12 q-px-sm'">
        <div class="text-center text-light-green-8 text-h6 text-bold">
          {{t(`${TRANC_PREFIX}.last_news`)}}
        </div>
        <router-link
            :to="{ name: 'news_detail', params: { id: homeInfo.first_news.id_card }}"
            class="link-no-underline">
          <q-card>
            <q-img
                fit="fill"
                :style="$q.platform.is.desktop ? 'height: 400px' : 'height: 200px'"
                :src="homeInfo.first_news.image"/>

            <q-card-section>
              <div class="text-h6 text-light-green-8 inner-image" v-html="homeInfo.first_news['name_'+currentLocale]"/>
              <div class="text-subtitle2 text-grey-10 inner-image" v-html="homeInfo.first_news['short_content_'+currentLocale]"/>
            </q-card-section>

            <q-separator />

            <q-card-actions align="center">
              <q-icon size="xs" name="visibility" class="text-light-green-8"/>
              <span class="text-light-green-8 q-mx-lg">{{homeInfo.first_news.view_count}}</span>
              <q-space/>
              <span id="triggerEvent" class="text-light-green-8 q-mx-lg">{{homeInfo.first_news.date}}</span>
            </q-card-actions>
          </q-card>
        </router-link>
      </div>
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
  height: 300px;
}
.outlined-item {
  border-radius: 50px; /* Округление углов */
  padding: 10px; /* Добавление отступов внутри элемента */
  background-color: white;
  box-shadow: 1px 1px 20px #181f04;
}

</style>
