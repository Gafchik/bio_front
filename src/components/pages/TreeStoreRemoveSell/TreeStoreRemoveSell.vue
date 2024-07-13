<script setup>
import moment from "moment";
import {useAppStore} from "@/store/app-store.js";
const appStore = useAppStore()
const {userInfo} = storeToRefs(appStore)
const {showInfoMassage, showErrorMassage} = appStore
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {storeToRefs} from "pinia";
import {computed, ref, watchEffect} from "vue";
import {useTreeStoreSellStore} from "@/store/pages/TreeStoreSell/tree-store-sell-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
const {openDialogConfirm} = useDialogConfirmStore()
const T_PREFIX = 'pages.tree_store_remove_sell'

const treeStoreSellStore = useTreeStoreSellStore()
const {getTreeInSellAsync,removeSellTreesAsync} = treeStoreSellStore
getTreeInSellAsync()
const {treeInSell} = storeToRefs(treeStoreSellStore)
const isEmpty = computed(() => {
  return !treeInSell.value.length
})
const columns = computed(() => {
  return [
    {
      name: 'uuid',
      required: true,
      label: t(`${T_PREFIX}.table_headers.uuid`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'year',
      required: true,
      label: t(`${T_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.planting_date,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'season',
      required: true,
      label: t(`${T_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => row.season,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'sell_amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.sell_amount`),
      align: 'center',
      field: row => row.price,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'commission',
      required: true,
      label: t(`${T_PREFIX}.table_headers.commission`),
      align: 'center',
      field: row => row.commission,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'commission_amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.commission_amount`),
      align: 'center',
      field: row => row.price /100 /100 * parseInt(row.commission),
      format: val => `${val}`,
      sortable: false
    },
  ]
})
const selected = ref([])
const twoFaCod = ref('')
const dialog = ref(false)
async function open2FaDialog(){
  dialog.value = true
}
function close2FaDialog(){
  dialog.value = false
  twoFaCod.value = null
}
function input2fa(){
  dialog.value = false
  removeSellTreesAsync({
    twoFaCod:twoFaCod.value,
    trees: selected.value
  }).then((res) =>{
    if(res){
      showInfoMassage(t(`${T_PREFIX}.confirm.success`))
    }
    twoFaCod.value = null
    getTreeInSellAsync()
    selected.value = [];
  })

}
function onSubmit(){
  if(!userInfo.value.enable_2_fact){
    showErrorMassage(t(`app.need2fa`))
  }else{
    openDialogConfirm({
      title: t(`${T_PREFIX}.confirm.title`),
      text: t(`${T_PREFIX}.confirm.text`),
      func: open2FaDialog,
    })
  }
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmpty" :emptyText="t(`${T_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="treeInSell"
          :columns="columns"
          row-key="id"
          dense
          :grid="$q.platform.is.mobile"
          :rows-per-page-options="[0]"
          selection="multiple"
          v-model:selected="selected"
      >
        <template v-slot:bottom></template>
        <template v-slot:header-selection="scope">
          <q-checkbox color="light-green-9" v-model="scope.selected" />
        </template>

        <template v-slot:body-selection="scope">
          <q-checkbox
              color="light-green-9"
              :model-value="scope.selected"
              @update:model-value="(val, evt) => { Object.getOwnPropertyDescriptor(scope, 'selected').set(val, evt) }"
          />
        </template>
        <template v-slot:body-cell-season="props">
          <q-td class="text-center">
            {{t(`app.season.${props.row.season}`)}}
          </q-td>
        </template>
        <template v-slot:body-cell-year="props">
          <q-td class="text-center">
            <span>{{new Date(props.row.planting_date).getFullYear()}}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-amount="props">
          <q-td class="text-center">
            <span>{{$filters.centToDollar(props.row.current_price)}}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-sell_amount="props">
          <q-td class="text-center">
            <span>{{$filters.centToDollar(props.row.price)}}</span>
          </q-td>
        </template>
        <template v-slot:body-cell-commission="props">
          <q-td class="text-center">
            <span>{{props.row.commission}}%</span>
          </q-td>
        </template>

        <template v-slot:item="props">
          <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card-section>
              <q-checkbox color="light-green-9"
                          dense
                          v-model="props.selected"
              />
            </q-card-section>
            <q-list dense style="background-color: #f5f3e4;">
              <q-item v-for="col in props.cols" :key="col.name">
                <template v-if="col.name === 'year'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{new Date(col.value).getFullYear() }}</q-item-label>
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
                <template v-if="col.name === 'sell_amount'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{$filters.centToDollar(col.value) }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'commission_amount'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'uuid'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'commission'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{col.value }}%</q-item-label>
                  </q-item-section>
                </template>
              </q-item>
              <div class="separator"></div>
            </q-list>
          </div>
        </template>
      </q-table>
      <div class="row justify-center">
        <q-btn
            v-show="!!selected.length"
            class="glossy"
            unelevated
            rounded
            :size="$q.platform.is.desktop ? 'xl' : 'lg'"

            @click="onSubmit"
            color="light-green-8"
            :label="t(`${T_PREFIX}.submit`)"/>
      </div>
      <q-dialog v-model="dialog" persistent>
        <q-card :style="$q.platform.is.desktop ? 'background-color: #e3e1c9; width: 30%' : 'background-color: #e3e1c9; width: 90%'">
          <q-card-section>
            <q-input
                :label="t(`app.input_2_fa_code`)"
                label-color="light-green-9"
                color="light-green-9"
                v-model="twoFaCod"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="close2FaDialog"/>
            <q-btn flat icon="done" color="positive" @click="input2fa"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </PersonalTemplate>
</template>

<style scoped>

</style>