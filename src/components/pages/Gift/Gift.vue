<script setup>
import moment from "moment";
import {DATE_PICKER_LOCALES} from "@/constants/date-picker-locales.js"
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {useI18n} from "vue-i18n";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
import {storeToRefs} from "pinia";
import {SALE_STATUS_ON_BALANCE} from "@/constants/tree-sale-status.js"
import {computed, ref} from "vue";
import SelectTreesDialog from "@/components/common/SelectTreesDialog.vue";
import {GIFT_DONATION,GIFT_CHARITY} from "@/constants/gift-types.js"
import {useSelectTreesDialogStore} from "@/store/common/select-trees-dialog-store.js";
import {useAppStore} from "@/store/app-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useGiftStore} from "@/store/pages/Gift/gift-store.js";
import rules from "@/rules/rules.js";
const {t} = useI18n()
const {openDialogConfirm} = useDialogConfirmStore()
const appStore = useAppStore()
const {showInfoMassage} = appStore
const {currentLocale} = storeToRefs(appStore)
const T_PREFIX = 'pages.gift'
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const {trees} = storeToRefs(personalStore)
const giftStore = useGiftStore()
const {giftTreesAsync} = giftStore
getTreesAsync()
const isEmptyPage = computed(() => !trees.value.length)
const FREEZE_SELL_YEAR = 3
const payload = ref({
  type: GIFT_DONATION,
  treesToGift: [],
  freezeMoneyYear: 0,
  freezeSellYear: FREEZE_SELL_YEAR,
  notifyDate: null,
  isKnowUser: true,
  email: '',
})
const selectedTreeDialogStore = useSelectTreesDialogStore()
const {openDialog} = selectedTreeDialogStore
function deleteFromSelect(item){
  const index = payload.value.treesToGift.indexOf(item);
  if (index > -1) {
    payload.value.treesToGift.splice(index, 1);
  }
}
function handleSelectTreesDialog(selectedTrees){
  payload.value.treesToGift = [...payload.value.treesToGift, ...selectedTrees]
}
function coordFormat(coord){
  let coordObj = JSON.parse(coord)
  return coordObj.lat +'<br>'+ coordObj.lng
}
const columns = computed(() => {
  return [
    {
      name: 'year',
      required: true,
      label: t(`${T_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.planting_date,
      format: val => new Date(val).getFullYear(),
      sortable: false
    },
    {
      name: 'season',
      required: true,
      label: t(`${T_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => row.season,
      format: val => t(`app.season.${val}`),
      sortable: false
    },
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
      name: 'coordinates',
      required: true,
      label: t(`${T_PREFIX}.table_headers.coord`),
      align: 'center',
      field: row => row.coordinates,
      format: val => coordFormat(val),
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
const isDonation = computed(() => {
  return payload.value.type === GIFT_DONATION
})
function changeFreezeMoneyYear(isAdd = true){
  if(payload.value.freezeMoneyYear === 0){
    if(isAdd){
      payload.value.freezeMoneyYear++
    }
  }else{
    isAdd
        ? payload.value.freezeMoneyYear++
        : payload.value.freezeMoneyYear--
  }
}
function changeFreezeSellYear(isAdd = true){
  if(payload.value.freezeSellYear === FREEZE_SELL_YEAR){
    if(isAdd){
      payload.value.freezeSellYear++
    }
  }else{
    isAdd
        ? payload.value.freezeSellYear++
        : payload.value.freezeSellYear--
  }
}
function dateOptions(date) {
  let today = moment().format('YYYY-MM-DD')
  return moment(date).isSameOrAfter(today)
}
const giftForm = ref(null)
function onSubmit(){
  openDialogConfirm({
    title: t(`${T_PREFIX}.confirm.title`),
    text: t(`${T_PREFIX}.confirm.text`),
    func: action,
  })
}
async function action(){
  giftTreesAsync(payload.value).then(res => {
    if(res){
      showInfoMassage(t(`${T_PREFIX}.confirm.success`))
      getTreesAsync()
      payload.value = {
        type: GIFT_DONATION,
        treesToGift: [],
        freezeMoneyYear: 0,
        freezeSellYear: FREEZE_SELL_YEAR,
        notifyDate: null,
        isKnowUser: true,
        email: '',
      }
      giftForm.value.resetValidation()
    }
  })
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmptyPage" :emptyText="t(`${T_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <q-form  @submit="onSubmit"
               ref="giftForm">
        <div class="q-mb-lg text-bold text-h6 text-green-8">
          {{t(`${T_PREFIX}.title`)}}
        </div>
        <div class="row justify-center">
          <div class="q-pr-sm" :style="$q.platform.is.desktop ? 'max-width: 50%;' : ''">
            <div class="text-center" style="position: relative;">
              <q-img
                  fit="fill"
                  :class="$q.platform.is.desktop ? 'tree_img' : 'tree_img_mobile'"
                  src="@/assets/image/gift/gift.png"/>

              <q-img
                  fit="fill"
                  :class="$q.platform.is.desktop ? 'mini_img' : 'mini_img_mobile'"
                  src="@/assets/image/gift/gift-1.png"/>
            </div>
            <div class="separator q-mt-sm"></div>
            <q-radio
                  v-model="payload.type"
                  :val="GIFT_DONATION"
                  size="50px"
                  :label="t(`${T_PREFIX}.donate.label`)"
                  color="light-green-8" />
            <div class="q-ml-sm">
              {{t(`${T_PREFIX}.donate.1`)}}

              <div class="q-ml-sm">
                {{t(`${T_PREFIX}.donate.2`)}}

                <br/>
                {{t(`${T_PREFIX}.donate.3`)}}

                <br/>
                {{t(`${T_PREFIX}.donate.4`)}}
              </div>
            </div>
          </div>
          <div class="q-pl-sm" :style="$q.platform.is.desktop ? 'max-width: 50%;' : ''">
            <div class="text-center" style="position: relative;">
              <q-img
                  fit="fill"
                  :class="$q.platform.is.desktop ? 'tree_img' : 'tree_img_mobile'"
                  src="@/assets/image/gift/gift.png"/>

              <q-img
                  fit="fill"
                  :class="$q.platform.is.desktop ? 'mini_img' : 'mini_img_mobile'"
                  src="@/assets/image/gift/gift-2.png"/>
            </div>
            <div class="separator q-mt-sm"></div>
            <q-radio
                v-model="payload.type"
                :val="GIFT_CHARITY"
                size="50px"
                :label="t(`${T_PREFIX}.charity.label`)"
                color="light-green-8" />

            <div class="q-ml-sm">
              {{t(`${T_PREFIX}.charity.1`)}}
              <div class="q-ml-sm">
               {{t(`${T_PREFIX}.charity.2`)}}
                <br/>
               {{t(`${T_PREFIX}.charity.3`)}}
              </div>
            </div>
          </div>
        </div>
        <q-table
            style="background-color: #f5f3e4;"
            class="q-my-lg border-shadow"
            :rows="payload.treesToGift"
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
          <template v-slot:body-cell-coordinates="props">
            <q-td class="text-center">
              <span v-html="coordFormat(props.row.coordinates)"></span>
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
          <template v-slot:item="props">
            <div
                class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-list dense style="background-color: #f5f3e4;">
                <q-item v-for="col in props.cols" :key="col.name">
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
                  <template v-else>
                    <q-item-section>
                      <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption class="text-black">
                        <span v-html="col.value"></span>
                      </q-item-label>
                    </q-item-section>
                  </template>
                </q-item>
                <div class="separator"></div>
              </q-list>
            </div>
          </template>
        </q-table>
        <div :class="$q.platform.is.desktop
          ? 'q-pa-sm q-mb-sm row bg-light-green-9 row justify-between no-wrap'
          : 'q-pa-sm q-mb-sm row bg-light-green-9 row justify-between'
        ">
          <div class="row">
            <div class="col-7 content-center text-white text-bold q-pr-sm">{{t(`${T_PREFIX}.freezeMoneyYear`)}}</div>
            <div class="col-5">
              <q-input
                  outlined
                  style="width: 150px"
                  borderless
                  label-color="white"
                  color="white"
                  bg-color="white"
                  dense
                  readonly
                  class="input-number-arrow text-white"
                  type="number"
                  v-model="payload.freezeMoneyYear"
              >
                <template v-slot:before>
                  <q-btn
                      size="sm"
                      flat icon="remove"
                      color="white"
                      @click="changeFreezeMoneyYear(false)"
                  />
                </template>
                <template v-slot:after>
                  <q-btn
                      size="sm"
                      flat icon="add"
                      color="white"
                      @click="changeFreezeMoneyYear(true)"/>
                </template>
              </q-input>
            </div>
          </div>
          <div v-if="isDonation" class="row">
            <div class="col-7 content-center text-white text-bold q-pr-sm">{{t(`${T_PREFIX}.freezeSellYear`)}}</div>
            <div class="col-5">
              <q-input
                  outlined
                  style="width: 150px"
                  borderless
                  label-color="white"
                  color="white"
                  bg-color="white"
                  dense
                  readonly
                  class="input-number-arrow text-white"
                  type="number"
                  v-model="payload.freezeSellYear"
              >
                <template v-slot:before>
                  <q-btn
                      size="sm"
                      flat icon="remove"
                      color="white"
                      @click="changeFreezeSellYear(false)"
                  />
                </template>
                <template v-slot:after>
                  <q-btn
                      size="sm"
                      flat icon="add"
                      color="white"
                      @click="changeFreezeSellYear(true)"/>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row justify-between">
            <div class="col-4 content-center text-white text-bold ">{{t(`${T_PREFIX}.notifyDate`)}}</div>
            <div class="col-8 row justify-end items-center content-center">
              <q-input
                  outlined
                  borderless
                  dense
                  readonly
                  label-color="white"
                  color="white"
                  bg-color="white"
                  v-model="payload.notifyDate"
                  mask="date"
                  class="text-white"
                  style="width: 150px">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                          v-model="payload.notifyDate"
                          :options="dateOptions"
                          :locale="DATE_PICKER_LOCALES[currentLocale]"
                          color="light-green-9"
                      >
                        <div class="row items-center justify-end">
                          <q-btn icon="done" color="light-green-9" flat  v-close-popup />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="q-mt-md">
          <q-checkbox color="light-green-9"
                      dense
                      :label="t(`${T_PREFIX}.isKnowUser`)"
                      v-model="payload.isKnowUser"
          />
        </div>
        <div v-if="payload.isKnowUser" class="q-mt-sm">
          <q-input
              style="width: 300px"
              class="q-my-xs"
              color="light-green-8"
              name="email"
              v-model="payload.email"
              :label="t(`${T_PREFIX}.email`)"
              :rules="[
                    rules.email(),
                    rules.required(t(`${T_PREFIX}.email`)),
                ]"
          />
        </div>
        <div v-else class="text-h5 q-mt-sm text-bold text-light-green-8">
          <span>{{t(`${T_PREFIX}.generate_code`)}}</span>
        </div>
        <div class="row justify-center q-mt-sm">
          <q-btn
              v-show="!!payload.treesToGift.length"
              class="glossy"
              unelevated
              rounded
              :size="$q.platform.is.desktop ? 'xl' : 'lg'"
              type="submit"
              color="light-green-8"
              :label="t(`${T_PREFIX}.submit`)"/>
        </div>
        <select-trees-dialog
            :tress="trees"
            :callback-action="handleSelectTreesDialog"
            :filter-function="(i) => {
              return i.tree_sale_status_id === SALE_STATUS_ON_BALANCE
                && !i.is_gifted
                && !payload.treesToGift.some(e => e.uuid === i.uuid)
            }"
        />
      </q-form>
    </template>
  </PersonalTemplate>
</template>

<style scoped>
.tree_img {
  height: 300px;
  width: 400px;
}
.tree_img_mobile {
  height: 200px;
  width: 270px;
}
.mini_img {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 82%;
  left: 47%;
  transform: translate(-50%, -50%);
}
.mini_img_mobile {
  height: 60px;
  width: 60px;
  position: absolute;
  top: 82%;
  left: 47%;
  transform: translate(-50%, -50%);
}
</style>