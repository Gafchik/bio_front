<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const TRANC_PREFIX = 'pages.personal'
const {t} = useI18n()
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const {trees} = storeToRefs(personalStore)
getTreesAsync()
const isEmptyPage = computed(() => !trees.value.length)
function getCoordString(coord,isLat = true){
  let coordObj = JSON.parse(coord)
  return isLat ? coordObj.lat : coordObj.lng
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmptyPage" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div v-for="tree in trees"
          :class="$q.platform.is.desktop ? 'row justify-center items-center content-center q-ma-md' : 'justify-center items-center content-center q-ma-md'">
        <div class="tree-circle col-4">
          <div class="glossy bg-light-green-8 text-white text-center text-bold"
               style="width: 150px; position: absolute; border-radius: 25px;">
            {{tree.uuid}}
          </div>
          <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
        </div>
        <div class="col-8 q-pa-md">
          <div :class="$q.platform.is.desktop ? 'row justify-around items-center content-center' : ''">
            <div>
              <div class="text-h6 text-light-green-9 text-bold">{{t(`${TRANC_PREFIX}.tree_info.georgia_place`)}}</div>
              <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.tree_info.location`)}}</div>
            </div>
            <div>
              <div class="text-subtitle2 text-light-green-9 text-bold">
                {{getCoordString(tree.coordinates)}}
                <br>
                {{getCoordString(tree.coordinates,false)}}
              </div>
              <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.tree_info.coords`)}}</div>
            </div>
          </div>
          <div class="separator"></div>
        </div>
      </div>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";
.tree-circle {
  display: inline-block; /* Чтобы контейнер подстраивался по размеру изображения */
  overflow: hidden; /* Обрезание изображения, чтобы оно не выходило за пределы рамки */
  border-radius: 50%; /* Создание круглой формы */
  border: 1px solid #7ba438; /* Зеленая круглая рамка */
  width: 150px; /* Ширина круга */
  height: auto; /* Высота круга */
}

.tree-circle img {
  width: 150px; /* Ширина изображения */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
}
</style>