<template>
	<div class="login-wrapper forget-password-wrapper">
		<!-- 输入邮箱 -->
		<div v-if="activeStep === 0" class="step-panel">
			<van-form @submit="handleEmailSubmit">
				<van-cell-group inset>
					<van-field v-model="email" name="email" label="邮箱" placeholder="请输入邮箱" :rules="emailRules" />
					<van-field
						v-model="imgCode"
						name="imgCode"
						label="验证码"
						placeholder="请输入图片验证码"
						:rules="securityRules"
						class="captcha-container"
					>
						<template #button>
							<div @click="refreshCode()">
								<!--验证码组件-->
								<security-code :identify-code="identifyCode"></security-code>
							</div>
						</template>
					</van-field>
				</van-cell-group>
				<div class="center">
					<van-button block type="primary" native-type="submit" class="login-reg-button">下一步</van-button>
				</div>
			</van-form>
		</div>
		<!-- 发送验证码 -->
		<div v-else-if="activeStep === 1" class="step-panel">
			<van-form @submit="handleCaptchaVerify">
				<van-cell-group inset>
					<van-field
						v-model="captchaCode"
						name="captchaCode"
						label="验证码"
						placeholder="请输入邮箱验证码"
						:rules="captchaRules"
						class="captcha-container"
					>
						<template #button>
							<!--验证码组件-->
							<captcha-button @send-captcha="sendCaptcha" />
						</template>
					</van-field>
				</van-cell-group>
				<div class="center">
					<van-button block type="primary" native-type="submit" class="login-reg-button">下一步</van-button>
				</div>
			</van-form>
		</div>
		<!-- 密码重置 -->
		<div v-else-if="activeStep === 2" class="step-panel">
			<van-form @submit="handleResetPassword">
				<van-cell-group inset>
					<van-field
						v-model="newPassword"
						type="password"
						name="newPassword"
						label="新密码"
						placeholder="请输入新密码"
						:rules="passwordRules"
					/>
					<van-field
						v-model="confirmPassword"
						type="password"
						name="confirmPassword"
						label="确认密码"
						placeholder="请再次输入密码"
						:rules="confirmPasswordRules"
					/>
				</van-cell-group>
				<div class="center">
					<van-button block type="primary" native-type="submit" class="login-reg-button">完成</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import "@/styles/loginFormField.css";
import CaptchaButton from "@/components/login/CaptchaButton.vue";
import SecurityCode from "@/components/login/SecurityCode.vue";
import { useRulesStore } from "@/stores/rulesStores";
import { useUtilsStore } from "@/stores/utilsStores";
import { postSendEmailCodeApi, postVerifyEmailCodeApi, postResetPasswordApi } from "@/apis/login/index";

const router = useRouter();
const rulesStore = useRulesStore();
const utilsStore = useUtilsStore();
// 步骤控制
const activeStep = ref(0);
// 表单数据
const email = ref("");
const captchaCode = ref("");
const imgCode = ref("");
const identifyCode = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// 校验规则
const emailRules = [{ validator: rulesStore.emailValidate, trigger: "onBlur" }];
const securityRules = [{ validator: rulesStore.securityValidate, trigger: "onBlur" }];
const captchaRules = [{ validator: rulesStore.captchaValidate, trigger: "onBlur" }];
const passwordRules = [{ validator: rulesStore.passwordValidate, trigger: "onBlur" }];
const confirmPasswordRules = [{ validator: rulesStore.confirmPasswordValidate, trigger: "onBlur" }];

onMounted(() => {
	refreshCode();
});
const refreshCode = () => {
	identifyCode.value = "";
	identifyCode.value = utilsStore.generateRandomCode("1234567890", 4); // 生成4位随机验证码
};

// 验证图片验证码-自动发送邮箱验证码
const handleEmailSubmit = async () => {
	if (imgCode.value === identifyCode.value) {
		/* @Rom:warning 希望当用户成功输入邮箱和图片验证码后，自动发送邮箱验证码，但是目前没有找到方法，所以暂时需要用户手动获取验证码
		 */
		// 触发子组件的 @send-captcha 事件
		// emit("send-captcha");
		activeStep.value = 1;
	} else {
		showToast("验证码错误,请重新输入");
	}
};
// 手动发送邮箱验证码
const sendCaptcha = async (callback) => {
	try {
		const { message } = await postSendEmailCodeApi({
			email: email.value,
			repeatability: false,
		});
		showToast(message);
		callback("success");
	} catch (errMsg) {
		showToast(errMsg);
		callback("fail");
	}
};
// 验证验证码
const handleCaptchaVerify = async () => {
	try {
		await postVerifyEmailCodeApi({
			email: email.value,
			code: captchaCode.value,
		});
		activeStep.value = 2;
		showToast("验证成功，请重置密码");
	} catch (errMsg) {
		showToast(errMsg);
	}
};
// 重置密码
const handleResetPassword = async () => {
	try {
		const { message } = await postResetPasswordApi({
			email: email.value,
			password: newPassword.value,
			code: captchaCode.value,
		});
		showToast(message);
		router.push({ name: "login" });
	} catch (errMsg) {
		showToast(errMsg);
	}
};
</script>

<style scoped>
.forget-password-wrapper {
	padding: 16px;
}
.forget-password-wrapper .van-cell:last-child::after {
	display: block;
}
.step-panel {
	margin-top: 24px;
}
.captcha-container :deep(button) {
	background-color: transparent;
	border-radius: 20px;
	border-color: var(--login-font-color);
}
.center {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
