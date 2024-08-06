<script setup>
import { useFaqStore } from '@/store/pages/FAQ/faq-store.js'
import { storeToRefs } from 'pinia'
import {useI18n} from "vue-i18n";
import {sleep} from "@/helpers/comon-helpers.js"
const {t} = useI18n()
import router from "@/routes/router.js"
import {onMounted,nextTick } from "vue";
const faqStore = useFaqStore()
const {getFaq,selectCategory} = faqStore
const {category,question,selectedCategoryId} = storeToRefs(faqStore)
const TRANC_PREFIX = 'pages.faq'
getFaq().then((res) => {
  if(res){
    nextTick();
    let query = router.currentRoute.value.query
    if(!!query.category && !!query.item) {
      let category = parseInt(query.category)
      let question = parseInt(query.item)
      selectCategory(category)
      sleep('500',() => {
        const element = document.querySelector(`[data-id="${query.category+'_'+query.item}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          element.querySelector('.q-expansion-item__content').style = {}
        }
      })
    }
  }
})
</script>

<template>
  <div>
    <div :class="{'flex-column': $q.platform.is.mobile, 'row wrap q-mt-lg': !$q.platform.is.mobile}">
      <div class="col-4 q-px-lg q-mb-lg">
        <div class="text-center text-bold q-mx-lg-md">
          {{t(`${TRANC_PREFIX}.select_section`)}}
        </div>
        <div v-for="(value,key) in category"
             class="my-card text-light-green-8 text-center text-bold"
        >
          <q-btn @click="selectCategory(value.faq_category_id)"
                 :disable="selectedCategoryId === value.faq_category_id"
                 text
                 text-color="light-green-8"
                 class="full-width"
                 :label="value.name" />
        </div>
      </div>
      <div class="col-8 q-px-lg">
        <q-expansion-item v-for="value in question"
                          :data-id="value.faq_category_id + '_' + value.faq_id"
                          expand-separator
                          class="q-mb-lg border-shadow"
                          icon="question_mark"
                          :label="value.question"
                          header-class="text-light-green-8 text-start text-bold"
                          style="background-color: #f5f3e4"
        >
          <q-card>
            <q-card-section style="background: #f5f3e4">
              <span class="inner-image" v-html="value.answer"/>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@sass/common-style.css";
.q-btn:before {
  box-shadow: none !important;
}
</style>