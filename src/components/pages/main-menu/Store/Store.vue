<script setup>
import {useI18n} from "vue-i18n";
import {useStoreStore} from "@/store/pages/Store/store-store.js";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import {useAppStore} from "@/store/app-store.js";
const {t} = useI18n()
const T_PREFIX = 'pages.store'
const storeStore = useStoreStore()
const appStore = useAppStore()
const {isLogin} = storeToRefs(appStore)
const {openReginDialog,showInfoMassage} = appStore
const {getTreeInStoreAsync,getTreeInStoreByYearAsync} = storeStore
const {treeByYear,treeStore} = storeToRefs(storeStore)
import {useDialogConfirmStore} from "@/store/common/dialog-confirm.js";
import {useBasketStore} from "@/store/common/basket-store.js";
const {openDialogConfirm} = useDialogConfirmStore()
const basketSore = useBasketStore()
const {addToBasket} = basketSore
getTreeInStoreAsync()
const level_1 = 1
const level_2 = 2
const level = ref(level_1)
function onClickBack(){
  getTreeInStoreAsync().then(() => level.value = level_1)
}
function to2level(item){
  getTreeInStoreByYearAsync({year: item.year}).then(() => level.value = level_2)
}
function buy(item){
  if(!!isLogin.value){
    openDialogConfirm({
      title: t(`${T_PREFIX}.basket.confirm.title`),
      text: t(`${T_PREFIX}.basket.confirm.text`),
      func: toBasket,
      funcParams: item,
    })
  }else{
    openReginDialog(t(`${T_PREFIX}.basket.confirm.success`))
  }
}
async function toBasket(item){
  addToBasket({...item,rules: true}).then(() => {
    showInfoMassage(t(`${T_PREFIX}.basket.confirm.success`))
  })

}
watch(isLogin, async (newValue, oldValue) => {
  if (newValue) {
    getTreeInStoreAsync().then(() => level.value = level_1)
  }
})
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 5%' : 'margin-inline: 5%'"
       class="items-center"
       id="newsCards">
    <div class="text-left text-bold text-h6 text-green-8 q-mt-lg">{{t(`main_menu.store`)}}</div>
    <div v-show="level === level_2">
      <q-chip
          class="glossy"
          square
          style="background-color: #f5f3e4"
          text-color="light-green-8"
          clickable
          @click="onClickBack"
          icon="arrow_back">
        {{t(`${T_PREFIX}.back`)}}
      </q-chip>
    </div>
    <div class="row justify-around items-center q-mt-sm">
      <div v-show="level === level_1" v-for="item in treeStore" class="q-ma-sm">
        <div class="item-container" @click="to2level(item)">
          <div class="content">
            <div class="text-center">
              <q-chip
                  size="lg"
                  color="brown-1"
                  text-color="light-green-8"
              >
                <span v-if="item.count <= 4">{{t(`${T_PREFIX}.count`,{count:item.count})}}</span>
                <span v-else>{{t(`${T_PREFIX}.count_2`,{count:item.count})}}</span>
              </q-chip>
            </div>
            <div>
              <q-img
                  fit="fill"
                  :style="$q.platform.is.desktop ? 'height: 150px; width: 300px' : 'height: 130px; width: 250px'"
                  src="@assets/image/shop/year-preview.png"
                  class="q-ma-lg"
              />
            </div>
            <div class="text-center">
              <q-chip
                  size="lg"
                  color="deep-orange-5"
                  text-color="white"
              >
                {{t(`${T_PREFIX}.year`,{year:item.year})}}
              </q-chip>
            </div>
          </div>
        </div>
      </div>
      <div v-show="level === level_2" v-for="item in treeByYear" class="q-ma-sm">
        <div class="tree-item"  @click="buy(item)">
          <div class="tree-content">
            <div class="image-container">
                <q-img
                    fit="fill"
                    :style="$q.platform.is.desktop ? 'height: 150px; width: 150px' : 'height: 150px; width: 150px'"
                    src="@assets/image/tree/shop-tree-new.png"
                    class="tree-image"
                />
                <div
                    class="text-light-green-8 text-bold"
                    style="position: absolute; top: 3%; left: 39%; font-size: 20px">
                  {{item.year}}
                </div>
                <div
                    class="text-light-green-8 text-bold"
                    style="position: absolute; bottom: 10%; left: 39%; font-size: 20px">
                  {{$filters.centToDollar(item.price)+' $'}}
                </div>
            </div>
            <div class="text-center text-light-green-8 tree-info text-bold">
              <div>{{$filters.centToDollar(item.price)+' $'}}</div>
              <div>{{t(`app.olive`)}}</div>
              <div>{{t(`${T_PREFIX}.year`,{year:item.year})}}</div>
              <div>{{t(`${T_PREFIX}.season`,{season:item.season})}}</div>
              <div v-show="parseInt(item.age) === 1">{{t(`${T_PREFIX}.age_1`,{age:item.age})}}</div>
              <div v-show="parseInt(item.age) > 1 && parseInt(item.age) < 5">{{t(`${T_PREFIX}.age_2`,{age:item.age})}}</div>
              <div v-show="parseInt(item.age) >= 5 ">{{t(`${T_PREFIX}.age_3`,{age:item.age})}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-container {
  position: relative;
  display: inline-block;
  overflow: visible;
}

.content {
  position: relative;
  z-index: 2;
}

.item-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  border: 1px solid transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  transition: all 0.3s ease;
  z-index: 1;
}

.item-container:hover::before {
  border-color: red;  /* Оранжевый цвет с прозрачностью */
  transform: translate(-50%, -50%) scale(1.1);
}

.tree-item {
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 15px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tree-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tree-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.tree-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 50%; /* Match the border radius of the parent */
  padding: 10px;
  box-sizing: border-box; /* Ensure padding is included in the element's width and height */
}

.tree-item:hover .tree-info {
  opacity: 1;
}

.tree-item:hover .tree-image {
  transform: translate(-50%, -50%) scale(1.1);
}
</style>