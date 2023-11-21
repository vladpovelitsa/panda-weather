import {createRouter, createWebHistory, RouterView} from 'vue-router'
import translation from "@/i18n/translation";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: [
        {
            path: '/:locale?',
            component: RouterView,
            beforeEnter: translation.routeMiddleware,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: () => import('../views/HomeView.vue')
                },
                {
                    path: 'my-locations',
                    name: 'my-locations',
                    component: () => import('../views/MyLocationsView.vue')
                }
            ]
        }
    ]
})
export default router
