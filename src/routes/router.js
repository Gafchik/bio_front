import Home from "@/components/Home.vue"
import { createRouter, createWebHistory } from 'vue-router'
const baseRoutes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    }
];

import page1 from "@/routes/pages/page1.js"
import page2 from "@/routes/pages/page2.js"

const routes = [
    ...baseRoutes,
    ...page1,
    ...page2,
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router