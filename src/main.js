import { createApp } from 'vue'
import { createPinia } from "pinia"

import App from './App.vue'
import router from './router'

// https://github.com/prazdevs/pinia-plugin-persistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import './assets/main.css'

/* add icons to the library */
library.add(faHeart)

const pinia = createPinia()

// makes sure that the store data persists. (by default, pinia does not automatically 
// persist application state, for example, when reloading)
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

// set this currency formatting function as global properties because
// this function will be used in more than one components. 
app.config.globalProperties.filters = {
  currencyFormatting(value) {
    return new Intl.NumberFormat("nl-be", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2
    }).format(value)
  }
}

// register necessary middlewares
app.component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount('#app')
