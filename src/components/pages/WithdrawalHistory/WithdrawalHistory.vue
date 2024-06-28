<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import {useWithdrawalHistoryStore} from "@/store/pages/WithdrawalHistory/withdrawal-history-store.js";
import {storeToRefs} from "pinia";
import moment from "moment";
const TRANC_PREFIX = 'pages.withdrawal_history'
const {t} = useI18n()
const withdrawalStore = useWithdrawalHistoryStore()
const {getWithdrawalsHistory} = withdrawalStore
getWithdrawalsHistory()
const {withdrawalsHistory} = storeToRefs(withdrawalStore)
const isEmpty = computed(() => {
  return !withdrawalsHistory.value.length
})
const columns = computed(() => {
  return [
    {
      name: 'date',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.date`),
      align: 'center',
      field: row => row.date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'time',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.time`),
      align: 'center',
      field: row => row.updated_at,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'amount',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.amount`),
      align: 'center',
      field: row => row.amount,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'type',
      required: true,
      label: t(`${TRANC_PREFIX}.table_headers.type`),
      align: 'center',
      field: row => row.type,
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
  ]
})

function getTime(date){
  return moment(date).format('hh:mm:ss');
}
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
            :rows="withdrawalsHistory"
            :columns="columns"
            row-key="id"
            :filter="search"
            dense
            :grid="$q.platform.is.mobile"
            :rows-per-page-options="[0]"
        >
          <template v-slot:bottom></template>
          <template v-slot:body-cell-type="props">
            <q-td class="text-center">
              {{t(`app.withdrawal.type.${props.row.type}`)}}
            </q-td>
          </template>
        <template v-slot:body-cell-status="props">
            <q-td class="text-center">
              {{t(`app.withdrawal.status.${props.row.status}`)}}
            </q-td>
          </template>
          <template v-slot:body-cell-time="props">
            <q-td class="text-center">
              {{getTime(props.row.updated_at)}}
            </q-td>
          </template>
          <template v-slot:body-cell-amount="props">
            <q-td class="text-center">
              <span>{{$filters.centToDollar(props.row.amount)+' $'}}</span>
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
                  <template v-if="col.name === 'date'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'time'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      {{getTime(col.value)}}
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'amount'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{$filters.centToDollar(col.value) +' $'}}</q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'type'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        {{t(`app.withdrawal.type.${col.value}`)}}
                      </q-item-label>
                    </q-item-section>
                  </template>
                  <template v-if="col.name === 'status'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        {{t(`app.withdrawal.status.${col.value}`)}}
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

</style>