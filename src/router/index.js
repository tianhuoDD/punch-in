import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // 创建历史记录，用于路由导航
	routes: [
		{
			path: "/",
			component: Layout,
		},
	],
});

export default router;
