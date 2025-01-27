import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import loginLayout from "@/layout/login-layout/index.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // 创建历史记录，用于路由导航
	routes: [
		{
			path: "/",
			component: Layout,
			redirect: "index",
			children: [
				{
					path: "index",
					name: "index",
					component: () => import("@/views/index.vue"),
				},
			],
		},
		{
			path: "/login-reg",
			component: loginLayout,
			redirect: "login",
			children: [
				{
					path: "login",
					name: "login",
					component: () => import("@/views/login-reg/LoginView.vue"),
				},
				{
					path: "register",
					name: "register",
					component: () => import("@/views/login-reg/RegisterView.vue"),
				},
			],
		},
	],
});

export default router;
