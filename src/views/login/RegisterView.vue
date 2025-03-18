<template>
	<div class="login-wrapper">
		<!-- 注册表单 -->
		<van-form
			ref="registerFormRef"
			style="margin-top: 20px"
			@submit="handleRegisterSubmit"
			@failed="handleRegisterFailed"
		>
			<!-- 表单输入框组 -->
			<van-cell-group inset>
				<van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="usernameRules" />
				<van-field
					v-model="password"
					name="password"
					type="password"
					label="密码"
					placeholder="密码"
					:rules="passwordRules"
				/>
				<van-field
					v-model="confirmPassword"
					name="confirmPassword"
					type="password"
					label="确认密码"
					placeholder="确认密码"
					:rules="confirmPasswordRules"
				/>
				<van-field v-model="email" name="email" label="邮箱" placeholder="邮箱" :rules="emailRules" />
				<van-field
					v-model="captcha"
					name="captcha"
					label="验证码"
					placeholder="验证码"
					:rules="captchaRules"
					class="captcha-container"
				>
					<template #button>
						<captcha-button @send-captcha="sendCaptcha" />
					</template>
				</van-field>
				<van-field name="protocol" label="复选框" :rules="protocolRules">
					<template #input>
						<van-checkbox v-model="isProtocolChecked" shape="square">
							我同意 《PunchIn用户服务协议》《隐私权政策》
						</van-checkbox>
					</template>
				</van-field>
			</van-cell-group>
			<!-- 提交按钮 -->
			<div style="display: flex; justify-content: center; align-items: center">
				<van-button plain type="primary" native-type="submit" class="login-reg-button">立即注册</van-button>
			</div>
		</van-form>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import "@/styles/loginFormField.css";
import CaptchaButton from "@/components/login/CaptchaButton.vue";
import { useRulesStore } from "@/stores/rulesStores";
import { postRegisterApi } from "@/apis/login/index";
const router = useRouter();
const rulesStore = useRulesStore();
const registerFormRef = ref();
// punch-in 注册
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const captcha = ref("");
const isProtocolChecked = ref();
// 表单验证规则
const usernameRules = [{ validator: rulesStore.usernameValidate, trigger: "onBlur" }];
const passwordRules = [{ validator: rulesStore.passwordValidate, trigger: "onBlur" }];
const confirmPasswordRules = [{ validator: rulesStore.confirmPasswordValidate, trigger: "onBlur" }];
const emailRules = [{ validator: rulesStore.emailValidate, trigger: "onBlur" }];
const captchaRules = [{ validator: rulesStore.captchaValidate, trigger: "onBlur" }];
const protocolRules = [{ validator: rulesStore.protocolValidate, trigger: "onSubmit" }];

// 注册成功
const handleRegisterSubmit = async () => {
	try {
		const { message } = await postRegisterApi({
			username: username.value,
			password: password.value,
			email: email.value,
		});
		showToast(message);
		router.push({ name: "login" });
	} catch (errMsg) {
		showToast(errMsg);
	}
};
// 注册失败
const handleRegisterFailed = () => {
	showLoadingToast("验证表单规则中...");
	setTimeout(() => {
		closeToast();
	}, 0);
};
// 发送验证码事件
const sendCaptcha = async (callback) => {
	try {
		await registerFormRef.value.validate("email");
		setTimeout(() => {
			// 这里去执行实际的发送逻辑，比如 emits("sendCaptcha")
			showToast("发送验证码成功,请查看邮箱...");
			callback("success");
		}, 500);
	} catch {
		callback("fail");
	}
};
</script>
<style scoped>
.captcha-container :deep(button) {
	background-color: transparent;
	border-radius: 20px;
	border-color: var(--login-font-color);
}
</style>
