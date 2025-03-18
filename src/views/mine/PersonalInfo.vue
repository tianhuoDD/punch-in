<template>
	<div class="personal-container">
		<!-- 顶部导航栏 -->
		<van-nav-bar title="我的个人资料" left-text="我的" left-arrow @click-left="goBack" />
		<van-cell class="space" :border="false" />
		<!-- 头像上传区域 -->
		<van-cell class="avatar">
			<template #title>
				<div class="uploader-wrapper">
					<van-uploader
						v-model="avatarList"
						:deletable="false"
						:show-upload="false"
						reupload
						:after-read="handleAvatarUpload"
					>
						<template #preview-cover>
							<svg-icon
								name="camera"
								width="20px"
								height="20px"
								color="var(--font-blue-color)"
								padding="5px"
								class="icon-style"
							/>
						</template>
					</van-uploader>
				</div>
			</template>
		</van-cell>
		<van-cell class="space" :border="false" />
		<!-- 可编辑的信息项 -->
		<van-cell is-link @click="goEditInfo('nickname', nickname)">
			<template #title>
				<van-space size="20px">
					<span class="cell-title">昵称</span>
					<span class="cell-content">{{ nickname }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell is-link @click="goEditInfo('email', email)">
			<template #title>
				<van-space size="20px">
					<span class="cell-title">邮箱</span>
					<span class="cell-content">{{ email }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell class="space" :border="false" />
		<!-- 仅展示，不可修改的内容 -->
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">用户名</span>
					<span class="cell-content">{{ username }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">PunchIn ID</span>
					<span class="cell-content">{{ id }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">创建时间</span>
					<span class="cell-content">{{ createdAt }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell class="fill-space space" :border="false" />
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { useUserStore } from "@/stores/userStores";
import { useUtilsStore } from "@/stores/utilsStores";
import { postAvatarApi } from "@/apis/user";
import default_avatar from "@/assets/images/default_avatar.png";
const router = useRouter();
const userStore = useUserStore();
const utilsStore = useUtilsStore();
// 用户信息
const userInfo = userStore.userInfo;
const avatarUrl = ref(userInfo.avatar ? utilsStore.getImageUrl(userInfo.avatar) : default_avatar);
const nickname = userInfo.nickname;
const email = userInfo.email;
const username = userInfo.username;
const createdAt = utilsStore.formatTime(userInfo.created_at);
const id = userInfo.id;
// 上传头像
const avatarList = ref([{ url: avatarUrl }]);
const goBack = () => {
	history.back();
};
const goEditInfo = (field, value) => {
	router.push({ name: "edit-info", state: { field, value } });
};

const handleAvatarUpload = async (file) => {
	const formData = new FormData();
	formData.append("avatar", file.file);
	try {
		let updatedInfo = { ...userStore.userInfo };
		const { message, data } = await postAvatarApi(formData);
		showToast(message);
		// 更新 Pinia 的 userInfo
		updatedInfo.avatar = data.avatar_url;
		userStore.setUserInfo(updatedInfo);
	} catch (errMsg) {
		showToast(errMsg);
	}
};
</script>
<style scoped>
.avatar {
	padding: 20px 0;
	background-color: var(--bg-gray-color);
}
.avatar :deep(.van-cell__title) {
	display: flex;
	justify-content: center;
	align-items: center;
}
.uploader-wrapper {
	width: 80px;
	height: 80px;
	position: relative; /* 让 van-uploader 作为相对定位的容器 */
	display: inline-block; /* 适应内容大小 */
}
.icon-style {
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: white; /* 背景色设置为白色 */
	border-radius: 50%; /* 可选，使其更圆滑 */
}
/* 单元格样式 */
.cell-title {
	color: var(--font-gray-color);
	font-size: 16px;
}
.cell-content {
	font-size: 16px;
}
/* 填充剩余空间样式 */
.personal-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.fill-space {
	flex-grow: 1;
}
.space {
	background-color: var(--bg-black-color);
}
</style>
