<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import TreeItem from "@/components/common/TreeItem.vue";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {useAppStore} from "@/store/app-store.js";

const appStore = useAppStore()
const {copyToClipboardNotify} = appStore
const TRANC_PREFIX = 'pages.personal'
const {t} = useI18n()
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const {trees} = storeToRefs(personalStore)
getTreesAsync()
const isEmptyPage = computed(() => !trees.value.length)

const search = ref('')
const columns = computed(() => {
  return [
    {
      name: 'uuid',
      required: true,
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'georgia_place',
      required: true,
      align: 'center',
      field: row => t(`${TRANC_PREFIX}.tree_info.georgia_place`),
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'coordinates',
      required: true,
      align: 'center',
      field: row => row.coordinates,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'planting_date',
      required: true,
      align: 'center',
      field: row => row.planting_date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'season',
      required: true,
      align: 'center',
      field: row => t(`app.season.${row.season}`),
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'purchase_date',
      required: true,
      align: 'center',
      field: row => row.purchase_date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'tree_sale_status_id',
      required: true,
      align: 'center',
      field: row => t(`app.tree_sale_status.${row.tree_sale_status_id}`),
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'purchase_price',
      required: true,
      align: 'center',
      field: row => row.purchase_price,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'current_price',
      required: true,
      align: 'center',
      field: row => row.current_price,
      format: val => `${val}`,
      sortable: true
    },
  ]
})
</script>

<template>
  <PersonalTemplate :is-empty="isEmptyPage" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="trees"
          :columns="columns"
          row-key="id"
          :filter="search"
          dense
          :grid="$q.platform.is.mobile"
          :rows-per-page-options="[0]"
      >
        <template v-slot:header></template>
        <template v-slot:bottom></template>
        <template v-slot:top>
          <div style="width: 100%" class="q-mt-sm">
            <q-input
                borderless
                outlined
                clearable
                label-color="light-green-9"
                color="light-green-9"
                dense
                v-model="search"
                :placeholder="t(`app.search`)">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:body="props">
          <TreeItem :tree="props.row"/>
        </template>
        <template  v-slot:item="props">
          <TreeItem :tree="props.row"/>
        </template>
      </q-table>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>