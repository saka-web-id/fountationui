import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
/*import './style.css'*/
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue'
import router from './router'
import en from './locales/en.json';
import id from './locales/id.json';
import cn from './locales/cn.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: false,
    fallbackLocale: 'en',
    messages: { en, id, cn }
})

const app = createApp(App);

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')

