<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {useGalleryStore} from "@/store/pages/Gallery/gallery-store.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
const galleryStore = useGalleryStore()
const {getAlbumsAsync} = galleryStore
const {albumsImages,albumsVideo} = storeToRefs(galleryStore)

getAlbumsAsync()
const TRANC_PREFIX = 'pages.gallery'
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 20%' : 'margin-inline: 5%'"
       class="items-center">
    <div class="text-left text-bold  q-mt-md text-light-green-8 text-h6">
      {{t(`${TRANC_PREFIX}.photo.title`)}}
    </div>
    <router-link
        v-for="imageAlbum in albumsImages"
        :to="{ name: 'album_detail', params: { id: imageAlbum.id }}"
        class="link-no-underline">
      <q-card class="q-my-lg">
        <q-img :src="imageAlbum.album_label" style="height: 300px">
          <div class="absolute-bottom">
            <div class="text-h6"> {{imageAlbum['name_'+currentLocale]}}</div>
            <div class="text-subtitle2">
              {{t(`${TRANC_PREFIX}.photo.count`,{count:imageAlbum.count})}}
            </div>
          </div>
        </q-img>
      </q-card>
    </router-link>

    <div class="text-left text-bold  q-mt-md text-light-green-8 text-h6">
    {{t(`${TRANC_PREFIX}.video.title`)}}
  </div>
    <router-link
        v-for="videoAlbum in albumsVideo"
        :to="{ name: 'album_detail', params: { id: videoAlbum.id }}"
        class="link-no-underline">
      <q-card  class="q-my-lg">
        <q-img :src="videoAlbum.album_label" style="height: 303px" loading="lazy">
          <div class="absolute-bottom">
            <div class="text-h6"> {{videoAlbum['name_'+currentLocale]}}</div>
            <div class="text-subtitle2">
              {{t(`${TRANC_PREFIX}.video.count`,{count:videoAlbum.count})}}
            </div>
          </div>
        </q-img>
      </q-card>
    </router-link>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>