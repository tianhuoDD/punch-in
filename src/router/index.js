import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // 创建历史记录，用于路由导航
	routes: [
		{
			path: "/",
			component: Layout,
			redirect: "/punch-in",
			children: [
				{
					path: "/punch-in",
					name: "punch-in",
					component: () => import("@/views/punch-in/index.vue"),
				},
				{
					path: "/punch-add",
					name: "punch-add",
					component: () => import("@/views/punch-in/PunchAdd.vue"),
				},
				{
					path: "/record-bills",
					name: "record-bills",
					component: () => import("@/views/record-bills/index.vue"),
				},
			],
		},
	],
});

export default router;
