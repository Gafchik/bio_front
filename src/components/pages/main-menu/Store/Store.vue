<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
const T_PREFIX = 'pages.store'
const treeGroupYear = [
  {
    year:2022,
    count:5,
  },
  {
    year:2021,
    count:15,
  },
  {
    year:2020,
    count:40,
  },
]
</script>

<template>
  <div :style="$q.platform.is.desktop ? 'margin-inline: 5%' : 'margin-inline: 5%'"
       class="items-center"
       id="newsCards">
    <div class="text-left text-bold text-h6 text-green-8 q-mt-lg">{{t(`main_menu.store`)}}</div>
    <div class="row justify-around items-center q-mt-xl">
      <div v-for="item in treeGroupYear" class="q-ma-sm">
        <div class="item-container">
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
</style>