<template>
	<div class="mine-wrapper">
		<!-- 顶部导航栏 -->
		<van-nav-bar>
			<template #right>
				<van-icon name="setting-o" size="18" />
			</template>
		</van-nav-bar>
		<!-- 个人信息展示 -->
		<van-cell is-link center to="/mine/personal-info">
			<template #title>
				<!-- 水平排列 -->
				<van-space>
					<!-- 头像 -->
					<van-image
						round
						width="5rem"
						height="5rem"
						:src="avatarUrl"
						@click.stop="handleImageClick"
						@error="handleImageError"
					/>
					<!-- 个人信息 -->
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
		<!-- 间隔分割行 -->
		<van-cell size="large" style="background-color: var(--bg-gray-color)" />
		<!-- 设置 -->
		<van-cell is-link center>
			<template #title>
				<van-space>
					<svg-icon name="setting" color="var(--font-gray-color)" padding="0" width="25px" height="25px" />
					<span>设置</span>
				</van-space>
			</template>
		</van-cell>
		<!-- 关于我们 -->
		<van-cell is-link center>
			<template #title>
				<van-space>
					<svg-icon name="about" color="var(--font-gray-color)" padding="0" width="25px" height="25px" />
					<span>关于我们</span>
				</van-space>
			</template>
		</van-cell>
		<!-- 退出登录 -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStores";
import { useUtilsStore } from "@/stores/utilsStores";
import SvgIcon from "@/components/SvgIcon.vue";
import default_avatar from "@/assets/images/default_avatar.png";
const router = useRouter();
const userStore = useUserStore();
const utilsStore = useUtilsStore();
// 用户信息
const userInfo = userStore.userInfo;
// 计算 avatarUrl，确保不会传入 null 或 undefined
const avatarUrl = ref(userInfo.avatar ? utilsStore.getImageUrl(userInfo.avatar) : default_avatar);
const nickname = userInfo.nickname;
const day = utilsStore.calculateDaysDifference(userInfo.created_at);
// 头像预览
const handleImageClick = () => {
	showImagePreview({
		images: [avatarUrl.value],
		startPosition: 0,
		showIndex: false,
		closeable: true,
	});
};
// 当图片加载失败时，使用默认头像
const handleImageError = () => {
	avatarUrl.value = default_avatar;
};
// 退出登录
const handleLogout = async () => {
	if (userStore.token) {
		showConfirmDialog({
			title: "退出登录",
			message: "您真的要退出登录吗？",
		})
			.then(() => {
				userStore.clearToken();
				showToast("退出登录成功！");
				router.push({ name: "login" });
			})
			.catch(() => {});
	} else {
		showToast("您还未登录,请登录...");
		router.push({ name: "login" });
	}
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
