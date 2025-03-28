<template>
	<div class="login-layout-container">
		<div style="padding-top: 20px">
			<svg-icon v-if="route.name === 'login'" name="left_arrow" @click="goIndex" />
			<svg-icon v-else name="left_arrow" @click="goBack" />
		</div>
		<router-view />
	</div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
const router = useRouter();
const route = useRoute();
// 返回按钮点击事件
const goIndex = () => {
	router.push({ name: "index" });
};
const goBack = () => {
	history.back();
};
</script>
<style scoped>
.login-layout-container {
	background-color: var(--login-bg);
	min-height: 100%;
}
</style>
