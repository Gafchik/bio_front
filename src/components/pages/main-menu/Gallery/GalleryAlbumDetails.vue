<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {useRoute} from "vue-router";
import {useGalleryStore} from "@/store/pages/Gallery/gallery-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import ImageCarouselDialog from "@/components/common/ImageCarouselDialog.vue";
import {useImageCarouselDialogStore} from "@/store/common/image-carousel-dialog.js";
const imageCarouselDialogStore = useImageCarouselDialogStore()
const {openImageCarouselDialog} = imageCarouselDialogStore
const galleryStore = useGalleryStore()
const {getAlbumDetails,getAlbumsAsync} = galleryStore
const {selectedAlbumInfo,selectedAlbumItems} = storeToRefs(galleryStore)
const TRANC_PREFIX = 'pages.gallery'
const router = useRoute();
const appStore = useAppStore()
const {currentLocale} = storeToRefs(appStore)
getAlbumsAsync().then(() => {
  if(!!router.params.id){
    getAlbumDetails(router.params.id).then((res) => {
      if(!res){
        router.push({ name: 'not_found' });
      }
    })
  }else{
    router.push({ name: 'not_found' });
  }
})
const videos = computed(() => {
  if(!selectedAlbumInfo.value.is_image){
    if(['ru','uk'].includes(currentLocale.value)){
      return selectedAlbumItems.value.filter(i => {
          if(i.lang === 'ru' || i.lang === null){
            return i
          }
      })
    }else{
      return selectedAlbumItems.value.filter(i => {
        if(i.lang !== 'ru' || i.lang === null){
          return i
        }
      })
    }
  }else{
    return []
  }
})
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 10%' : 'margin-inline: 5%'">
      <div v-if="!!selectedAlbumInfo.is_image">
        <div class="text-left text-bold  q-mt-md text-light-green-8 text-h6">
          {{t(`${TRANC_PREFIX}.photo.title`)}}
        </div>
        <div class="row wrap justify-center items-start content-start">
          <div v-for="item in selectedAlbumItems"
               class="q-mx-lg q-my-lg"
               @click="openImageCarouselDialog(selectedAlbumItems,item)">
            <q-img :src="item.link" fit="fill" loading="lazy"
                   :class="$q.platform.is.desktop ? 'linc_desktop' : 'linc_mobile'"
            />
          </div>
        </div>
      </div>

    <div v-else>

      <div class="text-left text-bold  q-mt-md text-light-green-8 text-h6">
        {{t(`${TRANC_PREFIX}.video.title`)}}
      </div>
    </div>
    <div class="row wrap justify-center items-start content-start">
      <div v-for="video in videos"  class="q-mx-lg q-my-lg">
        <q-video
            loading="lazy"
            :src="video.link"
            :class="$q.platform.is.desktop ? 'linc_desktop' : 'linc_mobile' "
        />
      </div>
    </div>
    <ImageCarouselDialog/>
  </div>
</template>

<style scoped>

</style>