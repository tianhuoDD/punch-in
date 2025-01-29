<template>
	<div class="personal-container">
		<van-nav-bar title="我的个人资料" left-text="我的" left-arrow @click-left="onClickLeft" />
		<van-cell class="space" :border="false" />
		<!-- 可修改的内容 -->
		<van-cell class="avatar">
			<template #title>
				<van-uploader
					v-model="avatarList"
					:deletable="false"
					:show-upload="false"
					reupload
					:after-read="handleAvatarUpload"
				/>
			</template>
		</van-cell>
		<van-cell class="space" :border="false" />
		<van-cell is-link @click="goToEdit('nickname', nickname)">
			<template #title>
				<van-space size="20px">
					<span class="cell-title">昵称</span>
					<span class="cell-content">{{ nickname }}</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell is-link @click="goToEdit('email', email)">
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
import { showToast } from "vant";
import { useUserStore } from "@/stores/userStores";
import { useUtilsStore } from "@/stores/utilsStores";
import { postAvatarApi } from "@/apis/user";
const router = useRouter();
const userStore = useUserStore();
const utilsStore = useUtilsStore();
// 用户信息
const userInfo = userStore.userInfo;
const nickname = userInfo.nickname;
const email = userInfo.email;
const username = userInfo.username;
const createdAt = utilsStore.formatTime(userInfo.created_at);
const id = userInfo.id;
const onClickLeft = () => {
	router.back();
};
const goToEdit = (field, value) => {
	router.push({ name: "edit-info", state: { field, value } });
};
// 上传头像
const avatarList = ref([{ url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" }]);
const handleAvatarUpload = async (file) => {
	const formData = new FormData();
	formData.append("avatar", file.file);
	try {
		const data = await postAvatarApi(formData);
		showToast(data.message);
	} catch (errMsg) {
		showToast(errMsg);
	}
};
</script>
<style scoped>
.personal-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.avatar {
	padding: 20px 0;
	background-color: var(--bg-gray-color);
}
.avatar :deep(.van-cell__title) {
	display: flex;
	justify-content: center;
	align-items: center;
}
.fill-space {
	flex-grow: 1;
}
.space {
	background-color: var(--bg-black-color);
}
.cell-title {
	color: var(--font-gray-color);
	font-size: 16px;
}
.cell-content {
	font-size: 16px;
}
</style>
