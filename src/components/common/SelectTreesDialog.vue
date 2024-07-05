<script setup>
import {useI18n} from "vue-i18n";
const {t} = useI18n()
import {useSelectTreesDialogStore} from "@/store/common/select-trees-dialog-store.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
const T_PREFIX = 'common.select_trees_dialog'
const selectedTreeDialogStore = useSelectTreesDialogStore()
const {closeDialog ,STATE_BY_YEAR_SEASON,STATE_BY_TREE,back} = selectedTreeDialogStore
const {dialog,currentState,selectedByYearSeason,selected} = storeToRefs(selectedTreeDialogStore)

const props =  defineProps({
  tress: {
    type: Array,
    required: true,
    default: []
  },
  callbackAction: {
    type: Function,
    required: true,
    default: () => {}
  },
  filterFunction: {
    type: Function,
    required: true,
    default: () => {return true}
  }
})
const filterTrees = computed(() => {
  return props.tress.filter(props.filterFunction)
})
const treesByYearSeason = computed(() => {
  return filterTrees.value.reduce((acc, tree) => {
    const year = new Date(tree.planting_date).getFullYear();
    const season = tree.season;
    const key = `${year}-${season}`;

    if (!acc[key]) {
      acc[key] = { year: year, season: season, count: 0 };
    }

    acc[key].count++;

    return acc;
  }, {});
})
const treeAfterSelect = computed(() => {
  if(!selectedByYearSeason.value){
    return []
  }
  return filterTrees.value.filter( i => {
    const year = new Date(i.planting_date).getFullYear();
    return year === selectedByYearSeason.value.year && i.season === selectedByYearSeason.value.season
  })
})
function selectGroupByYear(item){
  selectedByYearSeason.value = item
  currentState.value = STATE_BY_TREE
}
const columns = computed(() => {
  return [
    {
      name: 'uuid',
      required: true,
      label: t(`${T_PREFIX}.table_headers.uuid`),
      align: 'center',
      field: row => row.uuid,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'year',
      required: true,
      label: t(`${T_PREFIX}.table_headers.year`),
      align: 'center',
      field: row => row.planting_date,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'season',
      required: true,
      label: t(`${T_PREFIX}.table_headers.season`),
      align: 'center',
      field: row => row.season,
      format: val => `${val}`,
      sortable: true
    },
    {
      name: 'amount',
      required: true,
      label: t(`${T_PREFIX}.table_headers.amount`),
      align: 'center',
      field: row => row.current_price,
      format: val => `${val}`,
      sortable: true
    },
  ]
})
const treeNotFound = computed(() => {
  return !filterTrees.value.length
})
function selectTreesClick() {
  props.callbackAction(selected.value)
  closeDialog()
}
</script>

<template>
  <q-dialog v-model="dialog" persistent >
    <q-card style="background-color: #e3e1c9">
      <q-bar class="text-black row items-center justify-center text-center content-center`">
        <div class="text-h6">
          {{ t(`${T_PREFIX}.title`) }}
        </div>
      </q-bar>
      <q-card-section>
        <div v-if="treeNotFound">
          {{ t(`${T_PREFIX}.treeNotFound`) }}
        </div>
        <div v-else>
          <div v-for="tree in treesByYearSeason" v-if="currentState === STATE_BY_YEAR_SEASON"
               class="row justify-center items-center content-center q-my-md"
               style="position: relative; cursor: pointer;"
               @click.prevent="selectGroupByYear(tree)"
          >
            <div class="tree-circle col-4">
              <img src="@assets/image/tree/personal_welcome_tree.png" alt="logo_image">
            </div>
            <div class="q-mr-xl q-pl-sm">
              <div class="text-center text-subtitle2 text-light-green-9 text-bold">
                {{tree.year}}
              </div>
              <div class="text-center text-center text-subtitle2 text-light-green-9 text-bold">
                {{t(`app.season.${tree.season}`)}}
              </div>
              <div class="text-center">
                {{t(`${T_PREFIX}.count`,{count: tree.count})}}
              </div>
            </div>
          </div>
          <div v-if="currentState === STATE_BY_TREE">
            <q-btn flat icon="arrow_back" color="light-green-9" @click="back"/>
            <q-table
                style="background-color: #f5f3e4;"
                class="q-my-lg border-shadow"
                :rows="treeAfterSelect"
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
                <q-td class="text-center text-bold text-light-green-8">
                  <span>{{new Date(props.row.planting_date).getFullYear()}}</span>
                </q-td>
              </template>
              <template v-slot:body-cell-amount="props">
                <q-td class="text-center">
                  <span>{{$filters.centToDollar(props.row.current_price)}}</span>
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
                      <template v-if="col.name === 'uuid'">
                        <q-item-section>
                          <q-item-label class="text-bold">{{ col.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <q-item-label caption class="text-bold text-light-green-8">{{ col.value }}</q-item-label>
                        </q-item-section>
                      </template>
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
                    </q-item>
                    <div class="separator"></div>
                  </q-list>
                </div>
              </template>
            </q-table>
          </div>
        </div>


      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="close" color="negative" @click="closeDialog"/>
        <q-btn
            :disable="!selected.length"
            v-show="currentState !== STATE_BY_YEAR_SEASON"
            flat icon="done"
            color="positive"
            @click="selectTreesClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
@import "@sass/common-style.css";
.tree-circle {
  display: inline-block; /* Чтобы контейнер подстраивался по размеру изображения */
  overflow: hidden; /* Обрезание изображения, чтобы оно не выходило за пределы рамки */
  border-radius: 50%; /* Создание круглой формы */
  border: 1px solid #7ba438; /* Зеленая круглая рамка */
  width: 150px; /* Ширина круга */
  height: auto; /* Высота круга */
}

.tree-circle img {
  width: 150px; /* Ширина изображения */
  height: auto; /* Автоматическая высота, чтобы сохранить пропорции */
}
</style>