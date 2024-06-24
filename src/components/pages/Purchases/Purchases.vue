<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {usePurchasesStore} from "@/store/pages/Purchases/purchases-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
const TRANC_PREFIX = 'pages.purchases'
const {t} = useI18n()
const purchasesStore = usePurchasesStore()
const {orders} = storeToRefs(purchasesStore)
const isEmpty = computed(() => {
  return !orders.value.length
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
      name: 'detail',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.detail`),
      align: 'center',
      // field: row => row.id_album,
      format: val => `${val}`,
      // sortable: true
    },
  ]
})
const search = ref('')
</script>

<template>
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${TRANC_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <div class="q-mb-lg text-bold text-h6 text-green-8">
        {{t(`${TRANC_PREFIX}.title`)}}
      </div>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="orders"
          :columns="columns"
          row-key="id"
          :filter="search"
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
        <template v-slot:body-cell-detail="props">
          <q-td class="text-center">
            <router-link
                :target="$q.platform.is.ios ? '' : '_blank'"
                :to="{ name: 'purchases_detail', params: { id: props.row.id }}"
                class="text-light-green-8">
              {{t(`${TRANC_PREFIX}.detail`)}}
            </router-link>
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
                  <template v-if="col.name === 'detail'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        <router-link
                            :target="$q.platform.is.ios ? '' : '_blank'"
                            :to="{ name: 'purchases_detail', params: { id: props.row.id }}"
                            class="text-light-green-8">
                          {{t(`${TRANC_PREFIX}.detail`)}}
                        </router-link>
                      </q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
              <div class="separator"></div>
              </q-list>
          </div>
        </template>
      </q-table>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
@import "@sass/common-style.css";
</style>