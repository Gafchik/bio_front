import Home from "@/components/Home.vue"
import NotFound from "@/components/pages/404/404.vue"
import { createRouter, createWebHistory } from 'vue-router'
const baseRoutes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/not-found',
        component: NotFound,
        name: 'not_found'
    }
];

import MainMenu from "@/routes/main-menu.js"
const routes = [
    ...baseRoutes,
    ...MainMenu,
    {
        path: '/:pathMatch(.*)',
        redirect: { name: 'not_found' }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router