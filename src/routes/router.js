import Home from "@/components/Home.vue"
import { createRouter, createWebHistory } from 'vue-router'
const baseRoutes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    }
];

import MainMenu from "@/routes/main-menu.js"
const routes = [
    ...baseRoutes,
    ...MainMenu,
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router