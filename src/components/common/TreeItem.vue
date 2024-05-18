<script setup>
import {useAppStore} from "@/store/app-store.js";
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const appStore = useAppStore()
const {copyToClipboardNotify} = appStore
const props = defineProps({
  tree: {
    type: Object,
    required: true,
  }
})
function getCoordString(coord,isLat = true){
  let coordObj = JSON.parse(coord)
  return isLat ? coordObj.lat : coordObj.lng
}
</script>

<template>
  <div v-if="$q.platform.is.desktop" class="row justify-center items-center content-center q-my-md">
    <div class="tree-circle col-4">
      <q-btn
          style="width: 150px; position: absolute;"
          rounded
          @click="copyToClipboardNotify(tree.uuid)"
          size="sm"
          class="q-pa-0"
          color="light-green-8 text-bold"
          :label="tree.uuid" />
      <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
    </div>
    <div class="col-8 q-pa-md" v-if="$q.platform.is.desktop">
      <div class="row">
        <div class="col-4">
          <div class="text-h6 text-light-green-9 text-bold">{{t(`app.tree_info.georgia_place`)}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.location`)}}</div>
        </div>
        <div class="col-8">
          <div class="text-subtitle2 text-light-green-9 text-bold">
            {{getCoordString(tree.coordinates)}}
            {{' '}}
            {{getCoordString(tree.coordinates,false)}}
          </div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.coords`)}}</div>
        </div>
      </div>
      <div class="separator"></div>
      <div class="row text-center q-mt-sm">
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{$filters.dateToFormat(tree.planting_date,"YYYY")}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.planting_date`)}}</div>
        </div>
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{t(`app.season.${tree.season}`)}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.season`)}}</div>
        </div>
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{$filters.dateToFormat(tree.purchase_date,"DD.MM.YYYY")}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.purchase_date`)}}</div>
        </div>
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{t(`app.tree_sale_status.${tree.tree_sale_status_id}`)}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.tree_sale_status_id`)}}</div>
        </div>
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{$filters.centToDollar(tree.purchase_price)+'$'}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.purchase_price`)}}</div>
        </div>
        <div class="col-2">
          <div class="text-light-green-9 text-bold">{{$filters.centToDollar(tree.current_price)+'$'}}</div>
          <div class="text-subtitle2 text-bold">{{t(`app.tree_info.current_price`)}}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="width: 100%;">
    <q-list>
      <q-item>
        <q-item-section>
          <div class="tree-circle col-4">
            <q-btn
                style="width: 150px; position: absolute;"
                rounded
                @click="copyToClipboardNotify(tree.uuid)"
                size="sm"
                class="q-pa-0"
                color="light-green-8 text-bold"
                :label="tree.uuid" />
            <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
          </div>
        </q-item-section>
        <q-item-section side>
          <q-btn>test</q-btn>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.location`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{ t(`app.tree_info.georgia_place`)}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.coords`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            <div>{{getCoordString(tree.coordinates)}}</div>
            <div>{{getCoordString(tree.coordinates,false)}}</div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.planting_date`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{$filters.dateToFormat(tree.planting_date,"YYYY")}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.season`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{t(`app.season.${tree.season}`)}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.purchase_date`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{$filters.dateToFormat(tree.purchase_date,"DD.MM.YYYY")}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.tree_sale_status_id`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{t(`app.tree_sale_status.${tree.tree_sale_status_id}`)}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.purchase_price`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{$filters.centToDollar(tree.purchase_price)+'$'}}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.current_price`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label class="text-subtitle2 text-light-green-9 text-bold">
            {{$filters.centToDollar(tree.current_price)+'$'}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="separator"></div>
  </div>
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