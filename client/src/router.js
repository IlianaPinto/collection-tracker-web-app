import Vue from 'vue'
import Router from 'vue-router'
import { authGuard } from "./auth/authGuard";

Vue.use(Router);
const router = new Router({
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
            component: () => import('./views/Collections.vue'),
            beforeEnter: authGuard
        },
        {
            path: '/collections/items/:name',
            name: 'items',
            component: () => import('./views/Items.vue'),
            beforeEnter: authGuard
        }
    ]
});

export default router;