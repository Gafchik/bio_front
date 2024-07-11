<script setup>
import {storeToRefs} from "pinia";
import {useImageCarouselDialogStore} from "@/store/common/image-carousel-dialog.js";

const imageCarouselDialogStore = useImageCarouselDialogStore()
const {closeImageCarouselDialog} = imageCarouselDialogStore
const {slide,dialog,images,isFullscreen} = storeToRefs(imageCarouselDialogStore)
</script>

<template>
    <q-dialog
        v-model="dialog"
        maximized
    >
      <q-card style="background-color: rgba(0, 0, 0, 0.5)">
        <q-bar style="background-color: rgba(0, 0, 0, 0.0); height: auto">
          <q-space/>
          <q-btn dense flat color="red" icon="close" @click="closeImageCarouselDialog"/>
        </q-bar>
        <q-card-section>
          <q-carousel
              style="background-color: rgba(0, 0, 0, 0.0)"
              v-model="slide"
              arrows
              swipeable
              navigation
              infinite
              thumbnails
              height="39rem"
          >
            <q-carousel-slide v-for="image in images" :name="image.imageName" class="q-px-none q-py-none" >
              <q-img  height="39rem" fit="contain" :src="image.link" />
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<style scoped>

</style>