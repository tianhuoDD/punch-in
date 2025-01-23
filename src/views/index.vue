<template>
	<span>首页</span>
	<van-button type="primary" size="small" @click="toLogin">登录</van-button>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
	router.push({ name: "login" });
};
</script>
