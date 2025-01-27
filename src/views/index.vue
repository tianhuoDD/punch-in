<template>
	<span>首页</span>
	<van-button type="primary" size="small" @click="toLogin">登录</van-button>
	<van-button type="primary" size="small" @click="outLogin">退出登录</van-button>
</template>
<script setup>
import { useRouter } from "vue-router";
import { showToast } from "vant";
import { useUserStore } from "@/stores/userStores";
const router = useRouter();
const userStore = useUserStore();
const toLogin = () => {
	router.push({ name: "login" });
};
const outLogin = () => {
	if (userStore.token) {
		userStore.clearToken();
		showToast("退出登录成功");
		router.push({ name: "login" });
	} else {
		showToast("您还未登录");
		router.push({ name: "login" });
	}
};
</script>
