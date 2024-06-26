<script setup>
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
const appStore = useAppStore()

const {userInfo,axios} = storeToRefs(appStore)
const TRANC_PREFIX = 'common.userDisplay'
const {t} = useI18n()
const props = defineProps({
  emptyText: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <q-card :style="$q.platform.is.desktop ? 'min-width: 30%;': 'min-width: 80%;'"
          class="border-shadow q-mx-lg bg-card q-py-xl">
    <q-card-section>
      <div :class="$q.platform.is.desktop ? 'row justify-center items-center content-center' : 'justify-center items-center content-center'">
        <div :class="$q.platform.is.mobile ? 'tree-circle col-3' : 'col-3'">
          <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
        </div>
        <div class="col-9 q-pa-md">
          <div class="text-h5 text-bold">
            <span>{{t(`${TRANC_PREFIX}.empty_card.title`,{name:userInfo.first_name})}}</span>
          </div>
          <div class="text-h5 text-light-green-8 text-bold q-mt-xl">
            <span>{{emptyText}}</span>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
@import "@sass/common-style.css";
.bg-card {
  position: relative; /* Чтобы позволить дочернему элементу использовать размеры карточки в качестве относительных */
}

.bg-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Занимает всю ширину карточки */
  height: 100%; /* Занимает всю высоту карточки */
  background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('@assets/image/adaptive-icon.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

}

.tree-circle {
  display: inline-block; /* Чтобы контейнер подстраивался по размеру изображения */
  overflow: hidden; /* Обрезание изображения, чтобы оно не выходило за пределы рамки */
  border-radius: 50%; /* Создание круглой формы */
  border: 1px solid #7ba438; /* Зеленая круглая рамка */
  width: 250px; /* Ширина круга */
  height: auto; /* Высота круга */
}

.tree-circle img {
  width: 250px; /* Ширина изображения */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
}

</style>