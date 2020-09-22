import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/collections',
            name: 'collections',
            component: () => import('./views/Collections.vue')
        },
        {
            path: '/collections/items',
            name: 'items',
            component: () => import('./views/Items.vue')
        }
    ]
})