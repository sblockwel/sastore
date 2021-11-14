import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import App from './App.vue';

// router setup
import routes from './routes'

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
    .use(router)
    .mount('#app');