<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import TreeItem from "@/components/common/TreeItem.vue";
import SignedDocumentsDialog from "@/components/common/SignedDocumentsDialog.vue";
import {useI18n} from "vue-i18n";
import {usePurchasesStore} from "@/store/pages/Purchases/purchases-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
const TRANC_PREFIX = 'pages.purchases'
const {t} = useI18n()
const purchasesStore = usePurchasesStore()
const {selectedOrder,orderTrees} = storeToRefs(purchasesStore)
const {getOrderAsync,getPurchases, downloadDocAsync} = purchasesStore
const route = useRoute();
import router from "@/routes/router.js";
const SignedDocumentsDialogRef = ref(null)
const isEmpty = computed(() => {
  return !selectedOrder
})
getPurchases().then(() => {
  if(!!route.params.id){
    getOrderAsync(route.params.id).then((res) => {
      if(!res){
        router.push({ name: 'not_found' });
      }
    })
  }else{
    router.push({ name: 'not_found' });
  }
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
      name: 'created_at',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.created_at`),
      align: 'center',
      field: row => row.created_at,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'status',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.status`),
      align: 'center',
      field: row => row.status,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'trees_count',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.trees_count`),
      align: 'center',
      field: row => row.trees_count,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'total',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.total`),
      align: 'center',
      field: row => row.total,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'download',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.download`),
      align: 'center',
      // field: row => row.id_album,
      format: val => `${val}`,
      // sortable: true
    },
  ]
})
const search = ref('')
function callBackSingleDoc(){
  getOrderAsync(route.params.id)
}
function clickSignedDocuments(tree){
  SignedDocumentsDialogRef.value.openDialog(tree.uuid)
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.detailPage.title`,{uuid: selectedOrder.uuid})}}
      </div>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="[selectedOrder]"
          :columns="columns"
          row-key="id"
          dense
          :grid="$q.platform.is.mobile"
          :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
            >
              <span class="text-bold">
                {{ col.label }}
              </span>
            </q-th>
          </q-tr>
        </template>
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
        <template v-slot:body-cell-download="props">
          <q-td class="text-center">
            <q-btn color="light-green-8" flat icon="download" @click="downloadDocAsync(props.row)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td class="text-center">
            {{t(`app.oreder_status.${props.row.status}`)}}
          </q-td>
        </template>
        <template v-slot:body-cell-uuid="props">
          <q-td class="text-center text-bold text-light-green-8">
            <span>{{props.row.uuid}}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-total="props">
          <q-td class="text-center">
            <span>{{$filters.centToDollar(props.row.total)}}</span>
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
                    <q-item-label caption class="text-bold text-light-green-8">{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'created_at'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'status'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">
                      {{t(`app.oreder_status.${col.value}`)}}
                    </q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'trees_count'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{ col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'total'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{$filters.centToDollar(col.value)}}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'download'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">
                      <q-btn color="light-green-8" flat icon="download" @click="downloadDocAsync(props.row)"/>
                    </q-item-label>
                  </q-item-section>
                </template>
              </q-item>
              <div class="separator"></div>
            </q-list>
          </div>
        </template>
      </q-table>
      <div>
        <TreeItem
            v-for="(tree,index) in orderTrees" :key="index"
            :tree="tree"
            :click-signed-documents="clickSignedDocuments"
            :click-signed-documents-params="tree"
        />
      </div>
      <SignedDocumentsDialog ref="SignedDocumentsDialogRef" :callback-action="callBackSingleDoc"/>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>