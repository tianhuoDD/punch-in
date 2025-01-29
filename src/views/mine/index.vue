<template>
	<div class="mine-wrapper">
		<van-nav-bar>
			<template #right>
				<van-icon name="setting-o" size="18" />
			</template>
		</van-nav-bar>
		<van-cell is-link center to="/mine/personal-info">
			<template #title>
				<van-space>
					<van-image round width="5rem" height="5rem" :src="avatarUrl" @click.stop="handleImageClick" />
					<van-space direction="vertical" size="0">
						<h1 class="username">{{ nickname }}</h1>
						<span class="description">
							您已坚持
							<span style="color: var(--font-blue-color)">{{ day }}</span>
							天
						</span>
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
		<van-cell class="fill-space space" :border="false" />
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStores";
import { useUtilsStore } from "@/stores/utilsStores";
import SvgIcon from "@/components/SvgIcon.vue";
const router = useRouter();
const userStore = useUserStore();
const utilsStore = useUtilsStore();
// 用户信息
const userInfo = userStore.userInfo;
const avatarUrl = utilsStore.getImageUrl(userInfo.avatar);
const nickname = userInfo.nickname;
const day = utilsStore.calculateDaysDifference(userInfo.created_at);
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
// 图片预览
const handleImageClick = () => {
	showImagePreview({
		images: [avatarUrl],
		startPosition: 0,
		showIndex: false,
	});
};
</script>
<style scoped>
.mine-wrapper {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.username {
	font-size: 16px;
}
.description {
	font-size: 12px;
	color: var(--font-gray-color);
}
.fill-space {
	flex-grow: 1;
}
.space {
	background-color: var(--bg-black-color);
}
</style>
