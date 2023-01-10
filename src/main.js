import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faTwitter, faTwitch } from "@fortawesome/free-brands-svg-icons";

/* import specific icons */
import { faGear } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faGear, faTwitch, faTwitter, faGithub)

const app = createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
