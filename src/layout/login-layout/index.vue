<template>
	<div class="login-layout-container">
		<div style="padding-top: 20px">
			<svg-icon name="left-arrow" @click="handleBackClick" />
		</div>
		<router-view />
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
// 返回按钮点击事件
const handleBackClick = () => {
	router.back();
};
</script>
<style scoped>
.login-layout-container {
	background-color: var(--login-bg);
	height: 100%;
}
</style>
