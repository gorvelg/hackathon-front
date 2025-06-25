import {createWebHistory, createRouter} from "vue-router";

import ReportView from "@/views/ReportView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: ReportView
    },
    {
        path: '/report',
        name: 'report',
        component: ReportView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;