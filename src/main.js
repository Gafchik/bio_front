import { createApp } from 'vue'
import commonGlobalComponents from "@/constants/common-global-components.js"
import "vue3-openlayers/styles.css";
import OpenLayersMap from "vue3-openlayers";
import { Map, Layers, Sources } from "vue3-openlayers";
import "../src/modules/quasar.js"
import { Quasar, Notify, Dialog } from 'quasar'
import { Quill, QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { createPinia } from 'pinia'
const pinia = createPinia()
import i18n from "../src/modules/i18n.js"
import filters from "@/fillters/comon-fillters.js"
import router from "@/routes/router.js"

import App from './App.vue'
const myApp = createApp(App)
Object.keys(commonGlobalComponents).forEach(key => {
    myApp.component(key, commonGlobalComponents[key]);
});
import "quill/dist/quill.core.css";
const Block = Quill.import('blots/block');
Block.tagName = 'DIV';
Quill.register(Block, true);

myApp.use(pinia)
    .use(i18n)
    .use(OpenLayersMap)
    .use(Map)
    .use(Layers)
    .use(Sources)
    .component('QuillEditor', QuillEditor)
    .use(router)
    .use(Quasar, {
    plugins: {
        Notify,Dialog
    },
    config: {
      brand: {
      },
    }
})
myApp.config.globalProperties.$filters = filters
myApp.mount('#app')
