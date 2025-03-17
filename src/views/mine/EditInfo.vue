<template>
	<van-nav-bar
		:title="pageTitle"
		left-text="个人资料"
		right-text="确定"
		left-arrow
		@click-left="onClickLeft"
		@click-right="onClickRight"
	/>
	<van-cell-group inset>
		<van-field v-model="newValue" :label="fieldLabel" placeholder="请输入新的内容" />
	</van-cell-group>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/userStores";
import { postNicknameApi, postEmailApi } from "@/apis/user";
const router = useRouter();
const userStore = useUserStore();

// 使用 history.state 读取传递的数据
const field = history.state?.field || "";
const newValue = ref(history.state?.value || "");

// 根据 field 生成显示的 label
const fieldLabel = computed(() => {
	switch (field) {
		case "nickname":
			return "昵称";
		case "email":
			return "邮箱";
		default:
			return "未知";
	}
});

// 生成页面标题
const pageTitle = computed(() => `修改${fieldLabel.value}`);

// 取消修改，返回上一页
const onClickLeft = () => {
	history.back();
};

// 确定修改
const onClickRight = async () => {
	if (!newValue.value.trim()) {
		showToast("内容不能为空！");
		return;
	}
	try {
		let updatedInfo = { ...userStore.userInfo };

		if (field === "nickname") {
			const data = await postNicknameApi({ nickname: newValue.value });
			showToast(data.message);
			updatedInfo.nickname = newValue.value; // 更新 Pinia 的 userInfo
		} else if (field === "email") {
			const data = await postEmailApi({ email: newValue.value });
			showToast(data.message);
			updatedInfo.email = newValue.value; // 更新 Pinia 的 userInfo
		}
		// 更新 Pinia Store 和 localStorage
		userStore.setUserInfo(updatedInfo);
	} catch (errMsg) {
		showToast(errMsg);
	}
	history.back();
};
</script>
