<script setup>
import {useBasketStore} from "@/store/common/basket-store.js";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {computed, ref} from "vue";
import fillters from "@/fillters/comon-fillters.js"
import rules from "@/rules/rules.js";
import {useStoreStore} from "@/store/pages/Store/store-store.js";
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {usePersonalStore} from "@/store/pages/Personal/personal-store.js";
const {t} = useI18n()
const personalStore = usePersonalStore()
const {getTreesAsync} = personalStore
const basketStore = useBasketStore()
const {closeBasketDialog,deleteFromBasket,buyFromBasketAsync,changeRule,clearBasket} = basketStore
const {dialog,basket,twoFaCod} = storeToRefs(basketStore)
const T_PREFIX = 'common.basket'
const storeStore = useStoreStore()
const {} = storeStore
const {openDialogConfirm} = useDialogConfirmStore()
const emptyBasket = computed(() => {
  return !basket.value
})
function getName(item){
  if(parseInt(item.age) === 1){
    return t(`${T_PREFIX}.info_1`,{
      year: item.year,
      season: item.season,
      price: fillters.centToDollar(item.price),
    })
  }
  if(parseInt(item.age) > 1 && parseInt(item.age) < 5){
    return t(`${T_PREFIX}.info_2`,{
      year: item.year,
      season: item.season,
      price: fillters.centToDollar(item.price),
    })
  }
  if(parseInt(item.age) >= 5){
    return t(`${T_PREFIX}.info_3`,{
      year: item.year,
      season: item.season,
      price: fillters.centToDollar(item.price),
    })
  }
}
const prepareBasked = computed(() => {
  if(emptyBasket.value){
    return  []
  }
  else{
    return basket.value.map(i => {
      return { ...i, model: getName(i) };
    })
  }
})
const basketForm = ref(null)
const allPrice = computed(() => {
  let res = 0
  prepareBasked.value.forEach(i => {
    res+= i.price
  })
  return res
})
const twoFaDialog = ref(false)
function close2FaDialog(){
  twoFaDialog.value = false
  twoFaCod.value = null
}
function input2fa(){
  twoFaDialog.value = false
  buyFromBasketAsync(basket.value).then((result) =>{
    if(!!result.errors){
      result.trees.forEach(t => {
        close2FaDialog()
        changeRule(t,false).then(() => basketForm.value.validate())
      })
    }else {
      close2FaDialog()
      clearBasket()
    }
    twoFaCod.value = null
    getTreesAsync()
  })

}
async function open2FaDialog(){
  twoFaDialog.value = true
}
function onSubmit(){
  basketForm.value.validate().then(res => {
    if(!!res){
      openDialogConfirm({
        title: t(`${T_PREFIX}.confirm.title`),
        text: t(`${T_PREFIX}.confirm.text`,{price: fillters.centToDollar(allPrice.value)}),
        func: open2FaDialog,
      })
    }
  })
}
function callbackBuyStore(result){

}
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card :style="$q.platform.is.desktop ? 'background-color: #f5f3e4; width: 60%' :'background-color: #f5f3e4; min-width: 100%'">
      <q-bar class="text-black row items-center justify-center text-center content-center`" style="height: auto">
        <span class="text-h5 text-light-green-8">{{ t(`${T_PREFIX}.title`) }}</span>
        <q-space/>
        <q-btn flat icon="close" color="light-green-8" @click="closeBasketDialog"/>
      </q-bar>
      <q-form style="background-color: #f5f3e4"
              @submit="onSubmit"
              class="q-gutter-md"
              ref="basketForm"
      >
        <q-card-section>
          <div class="text-bold text-center" v-show="emptyBasket">
            <span> {{t(`${T_PREFIX}.emptyBasket`)}}</span>
          </div>
          <div v-show="!emptyBasket">
            <div class="text-bold text-center text-light-green-8">
              <span> {{t(`${T_PREFIX}.allPrice`,{price: fillters.centToDollar(allPrice)})}}</span>
            </div>
            <q-input v-for="item in prepareBasked"
              bottom-slots
              v-model="item.model"
              dense
              class="q-my-xs input-field text-bold text-light-green-8"
              color="light-green-8"
              type="text"
             :rules="[rules.basketRule(item.rules)]"
              readonly
            >
              <template v-slot:after>
                <q-btn @click="deleteFromBasket(item)" round dense color="red" flat icon="delete" />
              </template>
            </q-input>
            <div class="text-center text-light-green-8">
              <span> {{t(`${T_PREFIX}.info_text`)}} </span>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
              v-show="!emptyBasket"
              class="glossy q-mt-xl"
              unelevated
              rounded
              :size="$q.platform.is.desktop ? 'xl' : 'lg'"
              type="submit"
              color="light-green-8"
              :label="t(`${T_PREFIX}.submit`)"/>
        </q-card-actions>
      </q-form>
    </q-card>
    <q-dialog v-model="twoFaDialog" persistent>
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
  </q-dialog>
</template>

<style scoped>

</style>