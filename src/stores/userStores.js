// store/userStores.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
	const token = ref(localStorage.getItem("token") || ""); // 存储 token
	const userInfo = ref(JSON.parse(localStorage.getItem("userInfo")) || {}); // 存储用户信息

	// 设置token
	const setToken = (newToken) => {
		token.value = newToken;
		localStorage.setItem("token", newToken); // 保存到 localStorage
	};
	// 设置用户信息
	const setUserInfo = (newUserInfo) => {
		userInfo.value = newUserInfo;
		localStorage.setItem("userInfo", JSON.stringify(newUserInfo)); // 保存到 localStorage
	};
	// 清除 token 和用户信息
	const clearToken = () => {
		token.value = "";
		userInfo.value = {};
		localStorage.removeItem("token"); // 清除 token
		localStorage.removeItem("userInfo"); // 清除用户信息
	};
	// 获取token
	const getToken = () => {
		return token.value || localStorage.getItem("token"); // 优先从 store 中取
	};
	// 获取用户信息
	const getUserInfo = () => {
		return userInfo.value || JSON.parse(localStorage.getItem("userInfo")); // 优先从 store 中取
	};
	return {
		token,
		userInfo,
		setToken,
		setUserInfo,
		clearToken,
		getToken,
		getUserInfo,
	};
});
