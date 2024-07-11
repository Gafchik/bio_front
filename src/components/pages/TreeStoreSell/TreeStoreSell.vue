<script setup>
import moment from "moment";
const appStore = useAppStore()
const {showInfoMassage, showErrorMassage} = appStore
const {userInfo} = storeToRefs(appStore)
import {SALE_STATUS_ON_BALANCE} from "@/constants/tree-sale-status.js"
import {MIN_COMMISSION} from "@/constants/tree-store.js"
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
import {storeToRefs} from "pinia";
import {computed, ref, watchEffect} from "vue";
import {useSelectTreesDialogStore} from "@/store/common/select-trees-dialog-store.js";
import SelectTreesDialog from "@/components/common/SelectTreesDialog.vue";
import {useTreeStoreSellStore} from "@/store/pages/TreeStoreSell/tree-store-sell-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useAppStore} from "@/store/app-store.js";
const T_PREFIX = 'pages.tree_store_sell'
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const {trees} = storeToRefs(personalStore)
const isEmpty = computed(() => {
  return !trees.value.length
})
const treeStoreSellStore = useTreeStoreSellStore()
const {treeToSell,position,twoFaCod} = storeToRefs(treeStoreSellStore)
const {getPosition,sellTreesAsync} = treeStoreSellStore
const selectedTreeDialogStore = useSelectTreesDialogStore()
const {openDialog} = selectedTreeDialogStore
getTreesAsync()
function setPosition(){
  getPosition().then(() => {
    position.value.forEach(p => {
      treeToSell.value.forEach(t => {
        if(p.tree_id === t.id){
          t.position = p.position
        }
      })
    })
  })
}
function handleSelectTreesDialog(selectedTrees){
  treeToSell.value = [...treeToSell.value, ...selectedTrees]
  treeToSell.value.forEach(i => {
    i.sell_amount = (parseInt(i.current_price/100))+1
    i.commission = MIN_COMMISSION
    i.commission_amount = (i.sell_amount *MIN_COMMISSION /100).toFixed(2)
    i.position = 0
    i.profit_with_commission = i.sell_amount-parseFloat(i.commission_amount)
  })
  setPosition()
}
const columns = computed(() => {
  return [
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
      name: 'amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.amount`),
      align: 'center',
      field: row => row.current_price,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'sell_amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.sell_amount`),
      align: 'center',
      field: row => row.sell_amount,
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
      field: row => row.commission_amount,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'position',
      required: true,
      label: t(`${T_PREFIX}.table_headers.position`),
      align: 'center',
      field: row => row.position,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'profit_with_commission',
      required: true,
      label: t(`${T_PREFIX}.table_headers.profit_with_commission`),
      align: 'center',
      field: row => row.profit_with_commission,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'acton',
      required: true,
      align: 'center',
      sortable: false
    },
  ]
})
function deleteFromSelect(item){
  const index = treeToSell.value.indexOf(item);
  if (index > -1) {
    treeToSell.value.splice(index, 1);
  }
}
function addSellAmount(item){
  ++item.sell_amount
  setPosition()
}
function deleteSellAmount(item){
  if(item.sell_amount > parseInt(item.current_price/100)+1){
    --item.sell_amount
    setPosition()
  }
}
function inputSellAmount(item){
  if(item.sell_amount < parseInt(item.current_price/100)+1){
    item.sell_amount = parseInt(item.current_price/100)+1
  }
  setPosition()
}
function addSellCommission(item){
  if(item.commission<100){
    ++item.commission
    setPosition()
  }
}
function deleteSellCommission(item){
  if(item.commission > MIN_COMMISSION){
    --item.commission
    setPosition()
  }
}
function inputCommission(item){
  if(item.commission>100){
    item.commission = 100
  }
  if(item.commission < MIN_COMMISSION){
    item.commission = MIN_COMMISSION
  }
  setPosition()
}
watchEffect( () => {
  if(treeToSell.value){
    treeToSell.value.forEach(i => {
      i.commission_amount = (i.sell_amount *i.commission /100).toFixed(2)
      i.profit_with_commission = i.sell_amount-parseFloat(i.commission_amount)
    })
  }
})
const allProfitWithСommission = computed(() => {
  let res = 0
  if(!!treeToSell.value.length){
    treeToSell.value.forEach(i => {
      res += i.profit_with_commission
    })
  }
  return res.toFixed(2)
})
const {openDialogConfirm} = useDialogConfirmStore()
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
  sellTreesAsync().then((res) =>{
    if(res){
      treeToSell.value = []
      showInfoMassage(t(`${TRANC_PREFIX}.confirm.success`))
      getTreesAsync()
    }
    twoFaCod.value = null
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
      <div class="q-mb-lg text-bold text-h6 text-green-8" @selectTreesDialog="handleSelectTreesDialog">
        {{t(`${T_PREFIX}.title`)}}
      </div>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="treeToSell"
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
        <template v-slot:top-left>
          <q-btn
              flat icon="add"
              color="light-green-9"
              @click="openDialog">{{t(`${T_PREFIX}.addTree`)}}</q-btn>
        </template>
        <template v-slot:bottom></template>
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
        <template v-slot:body-cell-acton="props">
          <q-td class="text-center">
            <q-btn
                flat icon="delete"
                color="red"
                @click="deleteFromSelect(props.row)"/>
          </q-td>
        </template>
        <template v-slot:body-cell-sell_amount="props">
          <q-td class="text-center">
            <q-input
                outlined
                @blur="inputSellAmount(props.row)"
                class="input-number-arrow"
                style="width: 150px"
                borderless
                type="number"
                label-color="light-green-9"
                color="light-green-9"
                dense
                :min="100"
                v-model="props.row.sell_amount"
            >
              <template v-slot:before>
                <q-btn
                    size="xs"
                    flat icon="remove"
                    color="red"
                    @click="deleteSellAmount(props.row)"
                  />
              </template>
              <template v-slot:after>
                <q-btn
                    size="xs"
                    flat icon="add"
                    color="light-green-9"
                    @click="addSellAmount(props.row)"/>
              </template>
            </q-input>
          </q-td>
        </template>
        <template v-slot:body-cell-commission="props">
          <q-td class="text-center">
            <q-input
                outlined
                @blur="inputCommission(props.row)"
                style="width: 150px"
                borderless
                label-color="light-green-9"
                color="light-green-9"
                dense
                class="input-number-arrow"
                type="number"
                v-model="props.row.commission"
            >
              <template v-slot:before>
                <q-btn
                    size="xs"
                    flat icon="remove"
                    color="red"
                    @click="deleteSellCommission(props.row)"
                  />
              </template>
              <template v-slot:after>
                <q-btn
                    size="xs"
                    flat icon="add"
                    color="light-green-9"
                    @click="addSellCommission(props.row)"/>
              </template>
            </q-input>
          </q-td>
        </template>

        <template v-slot:item="props">
          <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
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
                <template v-if="col.name === 'amount'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{$filters.centToDollar(col.value) }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'position'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{col.value }}</q-item-label>
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
                <template v-if="col.name === 'profit_with_commission'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">{{col.value }}</q-item-label>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'acton'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                        flat icon="delete"
                        color="red"
                        @click="deleteFromSelect(props.row)"/>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'sell_amount'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-input
                        outlined
                        @blur="inputSellAmount(props.row)"
                        class="input-number-arrow"
                        style="width: 150px"
                        borderless
                        type="number"
                        label-color="light-green-9"
                        color="light-green-9"
                        dense
                        :min="100"
                        v-model="props.row.sell_amount"
                    >
                      <template v-slot:before>
                        <q-btn
                            size="xs"
                            flat icon="remove"
                            color="red"
                            @click="deleteSellAmount(props.row)"
                        />
                      </template>
                      <template v-slot:after>
                        <q-btn
                            size="xs"
                            flat icon="add"
                            color="light-green-9"
                            @click="addSellAmount(props.row)"/>
                      </template>
                    </q-input>
                  </q-item-section>
                </template>
                <template v-if="col.name === 'commission'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-input
                        outlined
                        @blur="inputCommission(props.row)"
                        style="width: 150px"
                        borderless
                        label-color="light-green-9"
                        color="light-green-9"
                        dense
                        class="input-number-arrow"
                        type="number"
                        v-model="props.row.commission"
                    >
                      <template v-slot:before>
                        <q-btn
                            size="xs"
                            flat icon="remove"
                            color="red"
                            @click="deleteSellCommission(props.row)"
                        />
                      </template>
                      <template v-slot:after>
                        <q-btn
                            size="xs"
                            flat icon="add"
                            color="light-green-9"
                            @click="addSellCommission(props.row)"/>
                      </template>
                    </q-input>
                  </q-item-section>
                </template>
              </q-item>
              <div class="separator"></div>
            </q-list>
          </div>
        </template>
      </q-table>
      <div class="q-pa-sm q-mb-sm row  justify-around bg-light-green-9">
        <div class="col-6 text-bold text-white">
          {{t(`${T_PREFIX}.all_profit_with_commission`)}}
        </div>
        <div class="col-6 text-bold text-white text-right">
          {{allProfitWithСommission}}$
        </div>
      </div>
      <div>
        {{t(`${T_PREFIX}.desc_1`)}}
      </div>
      <br>
      <div>
        {{t(`${T_PREFIX}.desc_2`)}}
      </div>
      <div class="row justify-center">
        <q-btn
            v-show="!!treeToSell.length"
            class="glossy"
            unelevated
            rounded
            :size="$q.platform.is.desktop ? 'xl' : 'lg'"

            @click="onSubmit"
            color="light-green-8"
            :label="t(`${T_PREFIX}.submit`)"/>
      </div>
      <select-trees-dialog
          :tress="trees"
          :callback-action="handleSelectTreesDialog"
          :filter-function="(i) => {
            let saleNoFrozen = !!i.sale_frozen_to
              ? moment(i.sale_frozen_to).isBefore(moment())
              : true
            return i.tree_sale_status_id === SALE_STATUS_ON_BALANCE
              && saleNoFrozen
              && !treeToSell.some(e => e.uuid === i.uuid)
          }"
      />
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