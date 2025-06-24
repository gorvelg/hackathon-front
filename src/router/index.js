import {createWebHistory, createRouter} from "vue-router";

import ReportView from "@/views/ReportView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
    {
        path: '/',
        name: 'report',
        component: ReportView },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;