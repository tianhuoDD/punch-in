import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStores";
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
					component: () => import("@/views/index.vue"), // 默认未登录时加载 index.vue
					beforeEnter: (to, from, next) => {
						const userStore = useUserStore();
						if (userStore.getToken()) {
							next({ name: "bill" }); // 如果已登录，重定向到 bill
						} else {
							next();
						}
					},
				},
				{
					path: "bill",
					name: "bill",
					meta: {
						requiresAuth: true,
					},
					component: () => import("@/views/bill/index.vue"),
				},
				{
					path: "mine",
					name: "mine",
					meta: {
						requiresAuth: true,
					},
					component: () => import("@/views/mine/index.vue"),
				},
			],
		},
		{
			path: "/bill/add-bill", // Mine 的个人信息页面
			name: "add-bill",
			meta: {
				requiresAuth: true, // 需要登录权限
			},
			component: () => import("@/views/bill/AddBill.vue"),
		},
		{
			path: "/bill/edit-svg", // Mine 的个人信息页面
			name: "edit-svg",
			meta: {
				requiresAuth: true, // 需要登录权限
			},
			component: () => import("@/views/bill/EditSvg.vue"),
		},
		{
			path: "/bill/add-svg", // Mine 的个人信息页面
			name: "add-svg",
			meta: {
				requiresAuth: true, // 需要登录权限
			},
			component: () => import("@/views/bill/AddSvg.vue"),
		},
		{
			path: "/mine/personal-info", // Mine 的个人信息页面
			name: "personal-info",
			meta: {
				requiresAuth: true, // 需要登录权限
			},
			component: () => import("@/views/mine/PersonalInfo.vue"),
		},
		{
			path: "/mine/personal-info/edit", // Mine 的个人信息页面
			name: "edit-info",
			meta: {
				requiresAuth: true, // 需要登录权限
			},
			component: () => import("@/views/mine/EditInfo.vue"),
		},
		{
			path: "/login-reg",
			component: loginLayout,
			redirect: "login",
			children: [
				{
					path: "login",
					name: "login",
					component: () => import("@/views/login/LoginView.vue"),
				},
				{
					path: "register",
					name: "register",
					component: () => import("@/views/login/RegisterView.vue"),
				},
			],
		},
		// 捕获所有未匹配的路径，跳转到 404 页面
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("@/views/NotFound.vue"),
		},
	],
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
	const userStore = useUserStore();
	const token = userStore.getToken();

	// 判断是否需要认证
	if (to.meta.requiresAuth && !token) {
		// 如果需要认证并且没有 token，则跳转到登录页面
		showToast({ message: "请先登录...", duration: 800 });

		next({ name: "login" });
	} else {
		// 否则继续访问
		next();
	}
});
export default router;
