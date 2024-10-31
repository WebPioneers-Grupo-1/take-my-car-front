import EN from "./locales/EN.json";
import ES from "./locales/ES.json";

import {createI18n} from "vue-i18n";

const i18n = createI18n({
    legacy: true, 
    locale: "EN",
    globalInjection: true, 
    messages:{
        EN,
        ES
    }
});

export default i18n;