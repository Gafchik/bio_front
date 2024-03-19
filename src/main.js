import { createApp } from 'vue'
import commonGlobalComponents from "@/constants/common-global-components.js"
import "../src/modules/quasar.js"
import { Quasar, Notify, Dialog } from 'quasar'

import { createPinia } from 'pinia'
const pinia = createPinia()

import i18n from "../src/modules/i18n.js"

import router from "@/routes/router.js"

import App from './App.vue'
const myApp = createApp(App)
Object.keys(commonGlobalComponents).forEach(key => {
    myApp.component(key, commonGlobalComponents[key]);
});


myApp.use(pinia)
    .use(i18n)
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

myApp.mount('#app')
