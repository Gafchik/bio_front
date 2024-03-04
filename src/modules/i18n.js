import {createI18n} from "vue-i18n";
import ukr from "@/locales/ukr/main_locail.js";
import rus from "@/locales/rus/main_locail.js";
import geo from "@/locales/geo/main_locail.js";
import eng from "@/locales/eng/main_locail.js";
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    allowComposition: true,
    locale: 'ukr',
    messages: {
        ukr: ukr,
        rus: rus,
        geo: geo,
        eng: eng,
    },
    fallbackLocale: 'ukr'
})
export default i18n