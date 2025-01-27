// store/user.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
	const token = ref(""); // 存储 token
	const userInfo = ref({}); // 存储用户信息

	// 设置token
	const setToken = (newToken) => {
		token.value = newToken;
		localStorage.setItem("token", newToken); // 可选：保存到 localStorage
	};

	// 清除token
	const clearToken = () => {
		token.value = "";
		localStorage.removeItem("token"); // 清除 localStorage 中的 token
	};

	// 获取token
	const getToken = () => {
		return token.value || localStorage.getItem("token"); // 优先从 store 中取
	};

	return {
		token,
		userInfo,
		setToken,
		clearToken,
		getToken,
	};
});
