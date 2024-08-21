<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {useInsuranceStore} from "@/store/pages/Insurance/insurance.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
import {useSelectTreesDialogStore} from "@/store/common/select-trees-dialog-store.js";
import moment from "moment";
import {SALE_STATUS_ON_BALANCE} from "@/constants/tree-sale-status.js";
import SelectTreesDialog from "@/components/common/SelectTreesDialog.vue";
const {t} = useI18n()
const T_PREFIX = 'pages.insurance'
const appStore = useAppStore()
const {showInfoMassage,getUserInfo} = appStore
const insuranceStore = useInsuranceStore()
const {getInsuranceTypesAsync, getInsuranceTreesAsync,downloadDocAsync,setInsuranceAsync} = insuranceStore
getInsuranceTypesAsync()
getInsuranceTreesAsync()
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const {trees} = storeToRefs(personalStore)
getTreesAsync()
const {insuranceTypes,insuranceTrees} = storeToRefs(insuranceStore)
const selectedTreeDialogStore = useSelectTreesDialogStore()
const {openDialog} = selectedTreeDialogStore
import {GREEN_PACK,PREMIUM,PLATINUM} from "@/constants/insurance-types.js"
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useAppStore} from "@/store/app-store.js";
const {openDialogConfirm} = useDialogConfirmStore()
const payload = ref({
  insurance_type: GREEN_PACK
})
const columns = computed(() => {
  return [
    {
      name: 'planting_date',  // Год посадки
      required: true,
      label: t(`${T_PREFIX}.select_table_headers.planting_date`),
      align: 'center',
      field: row => moment(row.planting_date).format('YYYY'),
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'season',  // Сезон
      required: true,
      label: t(`${T_PREFIX}.select_table_headers.season`),
      align: 'center',
      field: row => t(`app.season.${row.season}`),
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'green_pack',
      required: true,
      label: t(`${T_PREFIX}.select_table_headers.green_pack`),
      align: 'center',
      field: row => row.green_pack_price,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'premium',
      required: true,
      label: t(`${T_PREFIX}.select_table_headers.premium`),
      align: 'center',
      field: row => row.premium_price,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'platinum',
      required: true,
      label: t(`${T_PREFIX}.select_table_headers.platinum`),
      align: 'center',
      field: row => row.platinum_price,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'action',
      required: true,
      align: 'center',
      field: row => '',
      format: val => `${val}`,
      sortable: false
    },
  ]
})
const treeToInsurance = ref([])
function calcInsurancePrice(current_price,percent){
// Умножаем на 100, округляем в большую сторону и делим на 100
  let price = current_price * percent / 100 / 100
  return (Math.ceil(price * 100) / 100).toFixed(2);
}
function handleSelectTreesDialog(selectedTrees){
  treeToInsurance.value = [...treeToInsurance.value, ...selectedTrees]
  treeToInsurance.value.forEach(i => {
    insuranceTypes.value.forEach(t => {
      if(t.id === GREEN_PACK){
        i.green_pack_price = calcInsurancePrice(i.current_price,t.percent)
      }
      if(t.id === PREMIUM){
        i.premium_price = calcInsurancePrice(i.current_price,t.percent)
      }
      if(t.id === PLATINUM){
        i.platinum_price = calcInsurancePrice(i.current_price,t.percent)
      }
    })
  })
}
function deleteFromInsurance(item){
  treeToInsurance.value = treeToInsurance.value.filter(t => t.id !== item.id);
}
const disableSetInsurance = computed(() => {
  return !treeToInsurance.value.length
})
const columnsInsuranceTrees = computed(() => {
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
      name: 'email',
      required: true,
      label: t(`${T_PREFIX}.table_headers.email`),
      align: 'center',
      field: row => row.email,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'name',
      required: true,
      label: t(`${T_PREFIX}.table_headers.name`),
      align: 'center',
      field: row => row.name,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'percent',
      required: true,
      label: t(`${T_PREFIX}.table_headers.percent`),
      align: 'center',
      field: row => row.percent,
      format: val => `${val}%`,
      sortable: false
    },
    {
      name: 'action',
      required: true,
      align: 'center',
      sortable: false
    },
  ]
})
const LINK = 'https://api.biodeposit.ge/uploads/documents/Страховка деревьев GEO-RU.pdf'
function setInsurance(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.title`),
    text: t(`${T_PREFIX}.confirm.text`,{link: LINK}),
    func: setInsuranceAsync,
    funcParams: {
      trees: treeToInsurance.value,
      insurance_type: payload.value.insurance_type
    },
    callbackFunc: (res) => {
      if(!!res){
        showInfoMassage(t(`${T_PREFIX}.confirm.success`))
        treeToInsurance.value = []
        getInsuranceTreesAsync()
        getUserInfo()
      }
    },
  })
}
const avgGreen = computed(() => {
  let res = 0
  treeToInsurance.value.forEach(t => {
    res += parseFloat(t.green_pack_price)
  })
  return res
})
const avgPremium = computed(() => {
  let res = 0
  treeToInsurance.value.forEach(t => {
    res += parseFloat(t.premium_price)
  })
  return res
})
const avgPlatinum = computed(() => {
  let res = 0
  treeToInsurance.value.forEach(t => {
    res += parseFloat(t.platinum_price)
  })
  return res
})
</script>

<template>
  <PersonalTemplate :is-empty="false" :emptyText="t(`${T_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <q-form ref="buyYoungForm">
        <q-table
            style="background-color: #f5f3e4;"
            class="q-my-lg border-shadow"
            :rows="treeToInsurance"
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
          <template v-slot:body-cell-action="props">
            <q-td class="text-center">
              <q-btn
                  flat icon="delete"
                  color="red"
                  @click="deleteFromInsurance(props.row)"/>
            </q-td>
          </template>
          <template v-slot:item="props">
            <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-list dense style="background-color: #f5f3e4;">
                <q-item v-for="col in props.cols" :key="col.name">
                  <template v-if="col.name === 'action'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                          flat icon="delete"
                          color="red"
                          @click="deleteFromInsurance(props.row)"
                      />
                    </q-item-section>
                  </template>
                  <template v-else>
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{col.value}}</q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
                <div class="separator"></div>
              </q-list>
            </div>
          </template>
        </q-table>
        <div class="bg-light-green-8 q-pa-lg text-bold text-center text-white">
          <span v-if="$q.platform.is.mobile" v-html="t(`${T_PREFIX}.avg_mobile`,{
                green: avgGreen,
                premium: avgPremium,
                platinum: avgPlatinum,
              })">
          </span>
          <span v-else>
            {{
              t(`${T_PREFIX}.avg`,{
                green: avgGreen,
                premium: avgPremium,
                platinum: avgPlatinum,
              })
            }}
          </span>

        </div>
        <div v-for="type in insuranceTypes" :key="type.id" class="q-pt-sm">
          <q-radio
              v-model="payload.insurance_type"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :val="type.id"
              :label="t(`${T_PREFIX}.insurance_types`,{type:type.name})"
              color="light-green-8" />
          <div v-show="payload.insurance_type === type.id" class="q-pt-sm q-pl-xl">
            {{t(`${T_PREFIX}.insurance_types_text.`+type.id)}}
          </div>
        </div>
        <div class="row justify-center q-my-xl">
          <q-btn
              class="glossy"
              unelevated
              rounded
              :size="$q.platform.is.desktop ? 'xl' : 'lg'"
              :disable="disableSetInsurance"
              @click="setInsurance"
              color="light-green-8"
              :label="t(`${T_PREFIX}.set_insurance`)"/>
        </div>
        <select-trees-dialog
            :tress="trees"
            :callback-action="handleSelectTreesDialog"
            :filter-function="(i) => {
              const currentDate = new Date();
              const june30ThisYear = new Date(currentDate.getFullYear(), 5, 30);
              const plantingYear = new Date(i.planting_date).getFullYear();
              const age = currentDate.getFullYear() - plantingYear
              let ageBool = false
              if (age > 4) {
                ageBool = true;
              }
              if(age === 4){
                  ageBool = currentDate > june30ThisYear
              }
            return i.tree_sale_status_id === SALE_STATUS_ON_BALANCE
              && i.insurance_id === null
              && ageBool
          }"
        />
        <q-table
            style="background-color: #f5f3e4;"
            class="q-my-lg border-shadow"
            :rows="insuranceTrees"
            :columns="columnsInsuranceTrees"
            row-key="id"
            dense
            :grid="$q.platform.is.mobile"
            :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-action="props">
            <q-td class="text-center">
              <q-btn
                  flat icon="download"
                  color="green"
                  @click="downloadDocAsync(props.row)"/>
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
                  <template v-if="col.name === 'action'">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                          flat icon="download"
                          color="green"
                          @click="downloadDocAsync(props.row)"/>
                    </q-item-section>
                  </template>
                  <template v-else>
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">{{ col.value }}</q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
                <div class="separator"></div>
              </q-list>
            </div>
          </template>
        </q-table>
      </q-form>
    </template>
  </PersonalTemplate>
</template>

<style scoped>

</style>