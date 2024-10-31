import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import i18n from "./i18n.js";
import router from './routes/index.js';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';

const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura, options: {
            prefix: 'p', darkModeSelector: 'system', cssLayer: false
        }
    }
})
    .component('pv-toolbar', Toolbar)
    .component('pv-card', Card)
    .component('pv-select-button', SelectButton)
    .component('pv-button', Button)
    .component('pv-image', Image)
    .component('pv-input-text', InputText);

app.use(i18n);

app.mount('#app');
