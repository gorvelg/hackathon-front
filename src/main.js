import "./assets/main.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faMapMarkerAlt, faFlag, faMessage, faCheck} from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faMapMarkerAlt, faFlag, faMessage, faCheck)

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

app.mount('#app')