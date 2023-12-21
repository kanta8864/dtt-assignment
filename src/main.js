import { createApp, Vue } from 'vue'
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

/* add icons to the library */
library.add(faHeart)

const pinia = createPinia()

// makes sure that the store data persists. (by default, pinia does not automatically 
// persist application state, for example, when reloading)
pinia.use(piniaPluginPersistedstate)

// register necessary middlewares
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(pinia).mount('#app')
