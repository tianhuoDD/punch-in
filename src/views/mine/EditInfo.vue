<template>
	<!-- 顶部导航栏 -->
	<van-nav-bar
		:title="pageTitle"
		left-text="个人资料"
		right-text="确定"
		left-arrow
		@click-left="onClickLeft"
		@click-right="onClickRight"
	/>
	<!-- 输入表单 -->
	<van-cell-group inset>
		<van-field v-model="newValue" :label="fieldLabel" placeholder="请输入新的内容" />
		<!--验证码组件-->
		<van-field v-if="field === 'email'" v-model="emailCode" name="emailCode" label="验证码" placeholder="请输入验证码">
			<template #button>
				<!--验证码组件-->
				<captcha-button @send-captcha="sendCaptcha" />
			</template>
		</van-field>
	</van-cell-group>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStores";
import { putNicknameApi, putEmailApi } from "@/apis/user";
import { postSendEmailCodeApi, postVerifyEmailCodeApi } from "@/apis/login";
import CaptchaButton from "@/components/login/CaptchaButton.vue";

const userStore = useUserStore();
// 使用 history.state 读取传递的数据
const field = ref(history.state?.field || "");
const newValue = ref(history.state?.value || "");
const emailCode = ref("");
// 根据 field 生成显示的 label
const fieldLabel = computed(() => {
	switch (field.value) {
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
// 手动发送邮箱验证码
const sendCaptcha = async (callback) => {
	try {
		const { message } = await postSendEmailCodeApi({
			email: newValue.value,
		});
		showToast(message);
		callback("success");
	} catch (errMsg) {
		showToast(errMsg);
		callback("fail");
	}
};
// 确定修改
const onClickRight = async () => {
	if (!newValue.value.trim()) {
		showToast("内容不能为空！");
		return;
	}
	try {
		let updatedInfo = { ...userStore.userInfo };

		if (field.value === "nickname") {
			const { message } = await putNicknameApi({ nickname: newValue.value });
			showToast(message);
			updatedInfo.nickname = newValue.value; // 更新 Pinia 的 userInfo
		} else if (field.value === "email") {
			// 验证验证码
			await postVerifyEmailCodeApi({
				email: newValue.value,
				code: emailCode.value,
			});
			// 验证码成功后，更新邮箱
			const { message: emailUpdateMessage } = await putEmailApi({
				email: newValue.value,
			});
			showToast(emailUpdateMessage); // 邮箱修改成功
			updatedInfo.email = newValue.value; // 更新 Pinia 的 userInfo
		}
		// 更新 Pinia Store 和 localStorage
		userStore.setUserInfo(updatedInfo);
		history.back();
	} catch (errMsg) {
		showToast(errMsg);
	}
};
</script>
