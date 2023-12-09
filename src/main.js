import { createApp, watch } from 'vue'
import { createPinia } from "pinia"
import App from './App.vue'
import router from './router'
// https://github.com/prazdevs/pinia-plugin-persistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()

// makes sure that the store data persists. (by default, pinia does not automatically 
// persist application state, for example, when reloading)
pinia.use(piniaPluginPersistedstate)

// register necessary middlewares
createApp(App).use(router).use(pinia).mount('#app')
