import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) {
                next();
            } else {
                next('/login');
            }
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home')
    },
    {
        path: '/settings',
        name: 'settings',
        beforeEnter(to, from, next) {
            if (store.getters.isAuthenticated) {
                next();
            } else {
                next('/login');
            }
        },
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings')
    },
    {
        path: '/login',
        name: 'login',
        beforeEnter(to, from, next) {
            if (!store.getters.isAuthenticated) {
                next();
            } else {
                next('/');
            }
        },
        meta: {
            layout: 'auth'
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/Login')
    },
    {
        path: '/registration',
        name: 'registration',
        beforeEnter(to, from, next) {
            if (!store.getters.isAuthenticated) {
                next();
            } else {
                next('/');
            }
        },
        meta: {
            layout: 'auth'
        },
        component: () => import(/* webpackChunkName: "registration" */ '../views/Registration')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
