import {createWebHistory, createRouter} from "vue-router";

import ReportView from "@/views/ReportView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BlogView from "@/views/BlogView.vue";
import ArticleView from "@/views/ArticleView.vue";
import ForumView from "@/views/ForumView.vue";


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
    {
        path: '/blog',
        name: 'blog',
        component: BlogView,
    },
    {
        path: '/blog/:slug',
        name: 'article',
        component: ArticleView,
    },
    {
        path: '/forum',
        name: 'forum',
        component: ForumView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;