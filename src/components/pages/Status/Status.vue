<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import StatusDialog from "@/components/pages/Status/StatusDialog.vue";
import {useI18n} from "vue-i18n";
import {useStatusStore} from "@/store/pages/Status/status.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
const {t} = useI18n()
const statusStore = useStatusStore()
const {toNextLevel,currentStatus} = storeToRefs(statusStore)
const {openDialog,statuses} = statusStore
const TRANC_PREFIX = 'pages.status'
const statusesRevers = computed(() => {
  return [...statuses].reverse()
})
</script>

<template>
  <PersonalTemplate :is-empty="false" :emptyText="''">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        <q-icon
            size="xl"
            color="light-green-8"
            name="workspace_premium"
        />
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <div v-if="$q.platform.is.desktop">
        <div class="row q-my-md">
          <div class="col-4">
            <div class="text-h6 text-light-green-9 text-bold q-my-md">{{currentStatus.name}}</div>
            <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.current_status`)}}</div>
          </div>
          <div class="col-5">
            <div class="text-h6 text-light-green-9 text-bold q-my-md">{{toNextLevel}}</div>
            <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.next_status`)}}</div>
          </div>
          <div class="col-3">
            <q-btn
                   rounded
                   class="q-mt-xl"
                   color="light-green-8"
                   @click="openDialog"
                   :label="t(`${TRANC_PREFIX}.dialog.btn`)" />
          </div>
        </div>
        <div class="separator"></div>
        <div class="row justify-around content-start q-my-md">
          <div v-for="(status,index) in statuses" :key="index">
            <div class="text-h6 text-light-green-9 text-bold q-my-md">{{status.count_from}}</div>
            <div class="text-subtitle2 text-bold">{{status.name}}</div>
          </div>
        </div>
        <div class="row-wrapper">
          <div class="horizontal-row"></div>
          <div class="row justify-around content-start content-center text-center q-my-md">
            <div class="col-2 q-pa-xs" v-for="(status, index) in statuses" :key="index">
              <div :class="status.name === currentStatus.name ? 'tree-circle current-status-bg' : 'tree-circle my-bg-color'">
                <img style="width: 133px; height: auto"
                     v-show="status.name !== currentStatus.name"
                     class="q-mt-lg"
                     src="@assets/image/tree/shop-tree-new.png"
                     alt="logo_image">
                <img style="width: 133px; height: auto"
                     v-show="status.name === currentStatus.name"
                     class="q-mt-lg"
                     src="@assets/image/tree/shop-tree-new-white.png"
                     alt="logo_image">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <div class="text-h6 text-light-green-9 text-bold">{{currentStatus.name}}</div>
          <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.current_status`)}}</div>
          <div class="text-h6 text-light-green-9 text-bold">{{toNextLevel}}</div>
          <div class="text-subtitle2 text-bold">{{t(`${TRANC_PREFIX}.next_status`)}}</div>
          <div>
            <q-btn
                rounded
                class="q-ma-lg"
                color="light-green-8"
                @click="openDialog"
                :label="t(`${TRANC_PREFIX}.dialog.btn`)" />
          </div>
        </div>
        <div class="separator"></div>
        <div class="row-wrapper">
          <div class="vertical-row"></div>
          <div v-for="(status, index) in statusesRevers" :key="index" class="row justify-evenly q-mt-sm">
              <div :class="status.name === currentStatus.name ? 'tree-circle_m current-status-bg' : 'tree-circle_m my-bg-color'">
                <img style="width: 133px; height: auto"
                     v-show="status.name !== currentStatus.name"
                     src="@assets/image/tree/shop-tree-new.png"
                     class="q-mt-sm"
                     alt="logo_image">
                <img style="width: 133px; height: auto"
                     v-show="status.name === currentStatus.name"
                     src="@assets/image/tree/shop-tree-new-white.png"
                     class="q-mt-sm"
                     alt="logo_image">
              </div>

              <div class="col-6 text-center">
                <div class="text-h6 text-light-green-9 text-bold q-my-md">{{status.count_from}}</div>
                <div class="text-subtitle2 text-bold">{{status.name}}</div>
              </div>
          </div>
        </div>
      </div>
      <status-dialog/>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";

.row-wrapper {
  position: relative;
  z-index: 0; /* Устанавливаем контекст для z-index */
}

.tree-circle {
  display: inline-block; /* Чтобы контейнер подстраивался по размеру изображения */
  overflow: hidden; /* Обрезание изображения, чтобы оно не выходило за пределы рамки */
  border-radius: 50%; /* Создание круглой формы */
  border: 2px solid #7ba438; /* Зеленая круглая рамка */
  width: 130px;
  height: auto;
  position: relative; /* Устанавливаем позиционирование для управления z-index */
  z-index: 2; /* Устанавливаем больший z-index для .tree-circle */
}
.tree-circle img {
  width: 100px !important; /* Ширина изображения */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
}
.tree-circle_m {
  display: inline-block; /* Чтобы контейнер подстраивался по размеру изображения */
  overflow: hidden; /* Обрезание изображения, чтобы оно не выходило за пределы рамки */
  border-radius: 50%; /* Создание круглой формы */
  border: 2px solid #7ba438; /* Зеленая круглая рамка */
  width: 90px;
  height: auto;
  position: relative; /* Устанавливаем позиционирование для управления z-index */
  z-index: 2; /* Устанавливаем больший z-index для .tree-circle */
}
.tree-circle_m img {
  width: 85px !important; /* Ширина изображения */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
}

.current-status-bg {
  background-color: #7ba438; /* Полупрозрачный зеленый фон */
}

.horizontal-row {
  position: absolute; /* Устанавливаем позиционирование для управления z-index */
  z-index: 1; /* Устанавливаем меньший z-index для .horizontal-row */
  width: 90%; /* Устанавливаем ширину для линии */
  top: 42%; /* Положение линии */
  left: 0;
  margin-left: 40px;
  border-bottom: 20px solid grey; /* Цвет и стиль линии */
}
.vertical-row {
  position: absolute; /* Устанавливаем позиционирование для управления z-index */
  z-index: 1; /* Устанавливаем меньший z-index для .vertical-row */
  width: 1px; /* Узкая ширина для вертикальной линии */
  height: 90%; /* Устанавливаем высоту для линии */
  top: 5%; /* Положение линии сверху */
  left: 18%; /* Центрирование по горизонтали */
  margin-left: -1px; /* Корректировка для центрирования */
  border-left: 20px solid grey; /* Цвет и стиль линии */
}
</style>