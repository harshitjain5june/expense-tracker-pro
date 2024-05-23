import './assets/style.css'
import "@mdi/font/css/materialdesignicons.css";
import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import { createPinia } from 'pinia';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives,
})
createApp(App).use(vuetify).use(pinia).mount('#app')
