import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
/*import './style.css'*/
import App from './App.vue'
import router from './router'
import en from './locales/en.json';
import id from './locales/id.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: false,
    fallbackLocale: 'en',
    messages: { en, id }
})

const app = createApp(App);

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')

