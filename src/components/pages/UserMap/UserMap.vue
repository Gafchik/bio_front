<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {useUserMapStore} from "@/store/pages/UserMap/user-map-store.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import moment from "moment";
const TRANC_PREFIX = 'pages.user_map'
const {t} = useI18n()

const userMapStore = useUserMapStore()
const {trees,fields} = storeToRefs(userMapStore)
const isEmpty = computed(() => {
  return !trees.value.length
})
const columns = computed(() => {
  return [
    {
      name: 'uuid',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.uuid`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'coordinates',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.coordinates`),
      align: 'center',
      field: row => row.coordinates,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'year',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.planting_date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'season',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => row.season,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'purchase_price',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.purchase_price`),
      align: 'center',
      field: row => row.purchase_price,
      format: val => `${val}`,
      sortable: true
    },
  ]
})
function getCoordString(coord,isLat = true){
  let coordObj = JSON.parse(coord)
  return isLat ? coordObj.lat : coordObj.lng
}
function getYear(date){
  return moment(date).format('YYYY');
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <div class="row justify-between">
        <q-table
            style="background-color: #f5f3e4;"
            class="q-my-lg border-shadow"
            :rows="trees"
            :columns="columns"
            row-key="id"
            dense
            :grid="$q.platform.is.mobile"
            :rows-per-page-options="[0]"
        >

          <template v-slot:bottom></template>

          <template v-slot:body-cell-uuid="props">
            <q-td class="text-center">
              <span>{{props.row.uuid}}</span>
            </q-td>
          </template>
          <template v-slot:body-cell-coordinates="props">
            <q-td class="text-center">
              <div>{{getCoordString(props.row.coordinates)}}</div>
              <div>{{getCoordString(props.row.coordinates,false)}}</div>
            </q-td>
          </template>
          <template v-slot:body-cell-season="props">
            <q-td class="text-center">
              {{t(`app.season.${props.row.season}`)}}
            </q-td>
          </template>
          <template v-slot:body-cell-year="props">
            <q-td class="text-center">
             {{getYear(props.row.planting_date)}}
            </q-td>
          </template>
          <template v-slot:body-cell-purchase_price="props">
            <q-td class="text-center">
              <span>{{$filters.centToDollar(props.row.purchase_price)+'$'}}</span>
            </q-td>
          </template>
          <template v-slot:item="props">
            <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-list dense style="background-color: #f5f3e4;">
                <q-item v-for="col in props.cols"
                        :key="col.name">
                  <template v-if="col.name === 'uuid'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'coordinates'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <div>{{getCoordString(col.value)}}</div>
                      <div>{{getCoordString(col.value,false)}}</div>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'season'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        {{t(`app.season.${col.value}`)}}
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'purchase_price'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{$filters.centToDollar(col.value)}}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'year'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{getYear(col.value)}}</q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
                <div class="separator"></div>
              </q-list>
            </div>
          </template>
        </q-table>
      </div>
    </template>
  </PersonalTemplate>
</template>

<style scoped>

</style>