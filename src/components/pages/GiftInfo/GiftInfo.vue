<script setup>
import PersonalTemplate from "@/components/core/PersonalTemplate.vue";
import {ACTIVE,RECEIVED} from "@/constants/gift-status.js"
import {useI18n} from "vue-i18n";
const {t} = useI18n();
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const {copyToClipboardNotify,showInfoMassage} = appStore
import {computed, ref} from "vue";
import {useGiftStore} from "@/store/pages/Gift/gift-store.js";
import {useAppStore} from "@/store/app-store.js";
import rules from "@/rules/rules.js";
import {usePurchasesStore} from "@/store/pages/Purchases/purchases-store.js";
const giftStore = useGiftStore()
const purchases = usePurchasesStore()
const {downloadDocAsync} = purchases
const {getGiftInfoAsync,cancelMyGiftAsync,downloadGiftCertificateAsync,getGiftByCodeAsync} = giftStore
const {giftInfo} = storeToRefs(giftStore)
getGiftInfoAsync()
const isEmptyPage = computed(() => {
  return !giftInfo.value.length
})
const T_PREFIX = 'pages.gift_info'
const columns = computed(() => {
  return [
    {
      name: 'user_from',
      required: true,
      label: t(`${T_PREFIX}.table_headers.user_from`),
      align: 'center',
      field: row => row.user_from,
      format: val =>`${val}`,
      sortable: false
    },
    {
      name: 'user_to',
      required: true,
      label: t(`${T_PREFIX}.table_headers.user_to`),
      align: 'center',
      field: row => row.user_to ?? '',
      format: val =>`${val}`,
      sortable: false
    },
    {
      name: 'code',
      required: true,
      label: t(`${T_PREFIX}.table_headers.code`),
      align: 'center',
      field: row => row.code,
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'status',
      required: true,
      label: t(`${T_PREFIX}.table_headers.status`),
      align: 'center',
      field: row => t(`app.gift_status.${row.status}`),
      format: val => `${val}`,
      sortable: false
    },
    {
      name: 'tree_count',
      required: true,
      label: t(`${T_PREFIX}.table_headers.tree_count`),
      align: 'center',
      field: row => row.tree_count,
      format: val => `${val}`,
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
function download(item){
  if(item.status === RECEIVED && !item.i_gave){
    downloadDocAsync({id: item.order_id})
  }
  else if(!!item.i_gave){
    downloadGiftCertificateAsync(item.id)
  }
}
const codeDialog = ref(false)
const code = ref('')
const giftCodeForm = ref(null)
function openCodeDialog(){
  codeDialog.value = true
}
function closeCodeDialog(){
  giftCodeForm.value.resetValidation()
  codeDialog.value = false
  code.value = ''
}
function getGiftByCode(isCloseDialog = true){
  getGiftByCodeAsync({code:code.value}).then(res => {
    if(res){
      getGiftInfoAsync()
      if(isCloseDialog){
        closeCodeDialog()
      }
      showInfoMassage(t(`${T_PREFIX}.gift_get_success`))
      code.value = ''
    }
  })
}
function getCurrentGiftBuyCode(gift_code){
  code.value = gift_code
  getGiftByCode(false)
}
</script>

<template>
  <PersonalTemplate :is-empty="isEmptyPage" :emptyText="t(`${T_PREFIX}.empty_page`)">
    <template v-slot:personal-content>
      <q-table
          style="background-color: #f5f3e4;"
          class="q-my-lg border-shadow"
          :rows="giftInfo"
          :columns="columns"
          row-key="id"
          dense
          :grid="$q.platform.is.mobile"
          :rows-per-page-options="[0]"
      >
        <template v-slot:top-left>
          <q-btn
              flat icon="edit"
              color="light-green-9"
              @click="openCodeDialog">{{t(`${T_PREFIX}.set_code`)}}</q-btn>
        </template>
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
        <template v-slot:body-cell-code="props">
          <q-td class="text-center">
            <router-link
                class="text-green"
                to=""
                @click.prevent="copyToClipboardNotify(props.row.code)">
              {{props.row.code}}
            </router-link>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td class="text-center">
            <q-btn
                v-if="(props.row.status === ACTIVE && !props.row.i_gave)"
                flat icon="done"
                color="light-green-9"
                @click="getCurrentGiftBuyCode(props.row.code)"
            />
            <q-btn
                v-if="(props.row.status === RECEIVED && !props.row.i_gave) || !!props.row.i_gave"
                flat icon="download"
                color="light-green-9"
                @click="download(props.row)"
            />
            <q-btn
                v-if="props.row.status === ACTIVE && !!props.row.i_gave"
                flat icon="cancel"
                color="red"
                @click="cancelMyGiftAsync(props.row.id)"
               />
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
                    <q-btn
                        v-if="(props.row.status === ACTIVE && !props.row.i_gave)"
                        flat icon="done"
                        color="light-green-9"
                        @click="getCurrentGiftBuyCode(props.row.code)"
                    />
                    <q-item-label class="text-bold">
                      <q-btn
                          v-if="(props.row.status === RECEIVED && !props.row.i_gave) || !!props.row.i_gave"
                          flat icon="download"
                          color="light-green-9"
                          @click="download(props.row)"
                      />
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="text-black">
                      <q-btn
                          v-if="props.row.status === ACTIVE && !!props.row.i_gave"
                          flat icon="cancel"
                          color="red"
                          @click="cancelMyGiftAsync(props.row.id)"
                      />
                    </q-item-label>
                  </q-item-section>
                </template>
                <template v-else-if="col.name === 'code'">
                  <q-item-section>
                    <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption >
                      <router-link
                          class="text-green"
                          to=""
                          @click.prevent="copyToClipboardNotify(col.value)">
                        {{col.value}}
                      </router-link>
                    </q-item-label>
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
      <q-dialog v-model="codeDialog" persistent>
        <q-card style="background-color: #f5f3e4; min-width: 60%;" >
          <div class="text-center">
            <h5 class="text-light-green-8">{{$t(`${T_PREFIX}.dialog_title`)}}</h5>
          </div>
          <q-form style="background-color: #f5f3e4"
                  @submit="getGiftByCode"
                  class="q-gutter-md"
                  ref="giftCodeForm"
          >
            <q-card-section>
              <div class="row justify-center text-center">
                <q-input
                    style="width: 50%;"
                    class="q-my-xs input-field"
                    color="light-green-8"
                    type="text"
                    v-model="code"
                    :rules="[rules.required('')]"
                />
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat icon="close" color="negative" @click="closeCodeDialog"/>
              <q-btn flat icon="done" type="submit" color="positive"/>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </template>
  </PersonalTemplate>
</template>

<style scoped>

</style>