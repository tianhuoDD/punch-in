<template>
	<van-nav-bar>
		<template #right>
			<van-icon name="setting-o" size="18" />
		</template>
	</van-nav-bar>
	<van-cell is-link center>
		<template #title>
			<van-space>
				<van-image round width="5rem" height="5rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
				<van-space direction="vertical">
					<h1 class="username">Romcere</h1>
					<span class="description">这是描述</span>
				</van-space>
			</van-space>
		</template>
	</van-cell>
	<van-cell size="large" style="background-color: var(--bg-gray-color)" />
	<van-cell is-link center>
		<template #title>
			<van-space>
				<svg-icon name="setting" color="var(--font-gray-color)" padding="0" width="25px" height="25px" />
				<span>设置</span>
			</van-space>
		</template>
	</van-cell>
	<van-cell is-link center>
		<template #title>
			<van-space>
				<svg-icon name="about" color="var(--font-gray-color)" padding="0" width="25px" height="25px" />
				<span>关于我们</span>
			</van-space>
		</template>
	</van-cell>
	<van-cell is-link center @click="handleLogout">
		<template #title>
			<van-space>
				<svg-icon name="logout" color="var(--font-gray-color)" padding="0" width="25px" height="25px" />
				<span>退出登录</span>
			</van-space>
		</template>
	</van-cell>
</template>
<script setup>
import { useRouter } from "vue-router";
import { showToast, showConfirmDialog } from "vant";
import { useUserStore } from "@/stores/userStores";
import SvgIcon from "@/components/SvgIcon.vue";
const router = useRouter();
const userStore = useUserStore();
const handleLogout = async () => {
	if (userStore.token) {
		showConfirmDialog({
			title: "退出登录",
			message: "您真的要退出登录吗？",
		}).then(() => {
			userStore.clearToken();
			showToast("退出登录成功！");
			router.push({ name: "login" });
		});
	} else {
		showToast("您还未登录,请登录...");
		router.push({ name: "login" });
	}
};
</script>
<style scoped>
.username {
	font-size: 16px;
}
.description {
	font-size: 12px;
	color: var(--font-gray-color);
}
</style>
