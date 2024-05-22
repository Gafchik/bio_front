<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {useAppStore} from "@/store/app-store.js";
import {storeToRefs} from "pinia";
import {downloadPdfHelper} from "@/helpers/comon-helpers.js"

const props =  defineProps({
  callbackAction: {
    type: Function,
    required: true,
  },
})
const appStore = useAppStore()
const {axios} = storeToRefs(appStore)
const {t} = useI18n()
const isShowDialog = ref(false)
const treeId = ref(null)
function closeDialog(){
  isShowDialog.value = false
}
function openDialog(id){
  isShowDialog.value = true
  treeId.value = id
}
async function getOffer(){
  axios.value.get('/api/common/signed-documents/get-offer/'+treeId.value,{responseType: 'blob',})
      .then((response) => {downloadPdfHelper(response,'offer')})
      .catch(e => {console.log('e', e);});
}
async function getContract(){
  axios.value.get('/api/common/signed-documents/get-contract/'+treeId.value,{responseType: 'blob',})
      .then((response) => {downloadPdfHelper(response,'contract')})
      .catch(e => {console.log('e', e);});
}
async function getAct(){
  axios.value.get('/api/common/signed-documents/get-act/'+treeId.value,{responseType: 'blob',})
      .then((response) => {downloadPdfHelper(response,'act')})
      .catch(e => {console.log('e', e);});
}
async function action(){
  axios.value.post('/api/common/signed-documents/signed',{uuid: treeId.value,})
      .then((response) => {
        props.callbackAction()
        closeDialog()
      })
      .catch(e => {});
}
defineExpose({
  openDialog
});



</script>

<template>
  <q-dialog v-model="isShowDialog" persistent>
    <q-card style="background-color: #e3e1c9">
      <q-bar class="text-black row items-center justify-center text-center content-center`">
        <div class="text-h6 ">
          {{ t(`common.signedDocuments.title`) }}
        </div>
      </q-bar>
      <q-card-section>
        <div>
          <div>{{ t(`common.signedDocuments.1`) }}</div>
          <div>
            {{ t(`common.signedDocuments.2`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.2`) }}
          </div>
          <br>
          <div class="text-center text-green-8 text-bold">
            <a style="color:green" href="#" @click="getOffer">{{ t(`common.signedDocuments.2_1`) }}</a>
            <br>
            <a style="color:green" href="#" @click="getContract">{{ t(`common.signedDocuments.2_2`) }}</a>
            <br>
            <a style="color:green" href="#" @click="getAct">{{ t(`common.signedDocuments.2_3`) }}</a>
            <br> <br>
          </div>
          <div class="text-center text-green-8 text-bold">
            {{ t(`common.signedDocuments.text_after_linc`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_1`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_2`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_3`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_4`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_5`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.3_6`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.4`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.5`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.6`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_1`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_2`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_3`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_4`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_5`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.7_6`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.8`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.9`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.10`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.11`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.12`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.13`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.14`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.15`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.16`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.17`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.18`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.19`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.20`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.21`) }}
          </div>
          <br>
          <div>
            {{ t(`common.signedDocuments.22`) }}
          </div>
          <br>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="close" color="negative" @click="closeDialog"/>
        <q-btn flat icon="done" color="positive" @click="action"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>