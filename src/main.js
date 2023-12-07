import { createApp } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'

// register necessary middlewares
createApp(App).use(router).use(createPinia()).mount('#app')
