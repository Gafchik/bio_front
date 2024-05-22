<script setup>
import {useAppStore} from "@/store/app-store.js";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {downloadPdfHelper} from "@/helpers/comon-helpers.js";
const {t} = useI18n()
const appStore = useAppStore()
const {copyToClipboardNotify} = appStore
const {axios} = storeToRefs(appStore)

const props = defineProps({
  tree: {
    type: Object,
    required: true,
  },
  clickSignedDocuments: {
    type: Function,
    required: true
  },
  clickSignedDocumentsParams: {
    type: Object,
    required: true,
  },
})
const isSignedDocuments = computed(() => {
  return !!props.tree.signed_documents
})
function getCoordString(coord,isLat = true){
  let coordObj = JSON.parse(coord)
  return isLat ? coordObj.lat : coordObj.lng
}
async function downloadCertificate(treeId){
  axios.value.get('/api/common/signed-documents/download-certificate/'+treeId,{responseType: 'blob',})
      .then((response) => {downloadPdfHelper(response,'certificate')})
      .catch(e => {console.log('e', e);});
}
</script>

<template>
  <div v-if="$q.platform.is.desktop"
       class="row justify-center items-center content-center q-my-md"
       style="position: relative;"
  >
    <q-btn
        style="width: 300px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1"
        rounded
        v-if="!isSignedDocuments"
        size="md"
        @click="clickSignedDocuments(clickSignedDocumentsParams)"
        color="light-green-8 text-bold pulse-animation"
        :label="t(`app.tree_info.singleDocument`)" />
    <div class="tree-circle col-4">
      <q-btn
          style="width: 150px; position: absolute; z-index: 1; margin-top: 120px"
          rounded
          @click="downloadCertificate(tree.uuid)"
          size="sm"
          :class="isSignedDocuments
             ? 'q-pa-0'
             : 'q-pa-0 noSignedDocuments'"
          color="light-green-8 text-bold "
          :label="t(`app.tree_info.certificate`)" />
      <q-btn
          style="width: 150px; position: absolute; z-index: 1"
          rounded
          @click="copyToClipboardNotify(tree.uuid)"
          size="sm"
          :class="isSignedDocuments
             ? 'q-pa-0'
             : 'q-pa-0 noSignedDocuments'"
          color="light-green-8 text-bold "
          :label="tree.uuid" />
      <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image" :class="isSignedDocuments ? '' : 'noSignedDocuments'">
    </div>
    <div v-if="$q.platform.is.desktop"
         :class="isSignedDocuments
       ? 'col-8 q-pa-md'
       : 'col-8 q-pa-md noSignedDocuments'"
    >
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
      <q-item :class="isSignedDocuments ? '' : 'noSignedDocuments'">
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
            <q-btn
                style="width: 150px; position: absolute; z-index: 1; margin-top: 120px"
                rounded
                @click="downloadCertificate(tree.uuid)"
                size="sm"
                :class="isSignedDocuments
             ? 'q-pa-0'
             : 'q-pa-0 noSignedDocuments'"
                color="light-green-8 text-bold "
                :label="t(`app.tree_info.certificate`)" />
            <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
          </div>
        </q-item-section>
        <q-item-section side>

        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.location`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
            <div>{{getCoordString(tree.coordinates)}}</div>
            <div>{{getCoordString(tree.coordinates,false)}}</div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-btn
              style=" position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1"
              rounded
              v-if="!isSignedDocuments"
              @click="clickSignedDocuments(clickSignedDocumentsParams)"
              color="light-green-8 text-bold pulse-animation"
              :label="t(`app.tree_info.singleDocument`)" />
          <q-item-label class="text-subtitle2 text-bold">
            {{t(`app.tree_info.planting_date`)}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
          <q-item-label :class="isSignedDocuments
             ? 'text-subtitle2 text-light-green-9 text-bold'
             : 'text-subtitle2 text-light-green-9 text-bold noSignedDocuments'"
          >
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
.noSignedDocuments {
  filter: grayscale(100%);
}
</style>