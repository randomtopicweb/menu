import { createWebHistory, createRouter } from "vue-router";
import Blog from './components/Blog.vue'

const routes = [
    {
        path: "/blog",
        component: Blog,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router; 