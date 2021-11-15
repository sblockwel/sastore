import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './App.vue';

// router setup
import routes from './routes'
// configuracao dos icones
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt, faCheck, faStore, faUsers, faShoppingCart, faTags} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faPencilAlt)
library.add(faCheck)
library.add(faStore)
library.add(faUsers)
library.add(faShoppingCart)
library.add(faTags)

// configure router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for routes: routes
    linkActiveClass: 'nav-item active',
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash }
        } else {
            return { x: 0, y: 0 }
        }
    }
})
Vue.createApp(App)
    .component('fa-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app');