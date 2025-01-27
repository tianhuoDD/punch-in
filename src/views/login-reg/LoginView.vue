<template>
	<div class="login-wrapper">
		<!-- 欢迎文本 -->
		<van-row class="welcome-text">
			<span>你好，开发者!</span>
		</van-row>
		<!-- 其他登录方式 -->
		<van-row>
			<van-col :span="12" class="login-options" style="border-right: 1px solid var(--login-font-color)">
				<svg-icon name="wechat-fill" />
				<span>微信登录</span>
			</van-col>
			<van-col :span="12" class="login-options">
				<svg-icon name="qq" />
				<span>QQ登录</span>
			</van-col>
		</van-row>
		<!-- 分隔线 -->
		<van-divider :style="{ color: 'var(--login-font-color)' }"> 使用 PunchIn 账户登录 </van-divider>
		<!-- 登录表单 -->
		<van-form style="margin-top: 20px" @submit="onLoginSubmit" @failed="onLoginFailed">
			<van-cell-group inset>
				<van-field
					v-model="username"
					name="username"
					label="用户名"
					placeholder="用户名 / 邮箱"
					:rules="usernameRules"
				/>
				<van-field
					v-model="password"
					name="password"
					type="password"
					label="密码"
					placeholder="密码"
					:rules="passwordRules"
				/>
				<van-field name="protocol" label="复选框" :rules="protocolRules">
					<template #input>
						<van-checkbox v-model="isProtocolChecked" shape="square">
							我同意 《PunchIn用户服务协议》《隐私权政策》
						</van-checkbox>
					</template>
				</van-field>
			</van-cell-group>
			<div style="display: flex; justify-content: center; align-items: center">
				<van-button plain type="primary" native-type="submit" class="login-reg-button">立即登录</van-button>
			</div>
		</van-form>
		<!-- 注册、忘记密码按钮 -->
		<van-row class="extra-actions">
			<van-col :span="24">
				<van-grid column-num="2">
					<van-grid-item text="忘记密码" />
					<van-grid-item text="注册账号" @click="toRegister" />
				</van-grid>
			</van-col>
		</van-row>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { closeToast, showLoadingToast, showToast } from "vant";
import "@/styles/FormField.css";
import SvgIcon from "@/components/SvgIcon.vue";
import { loginApi } from "@/apis/login/index";
import { useRulesStore } from "@/stores/rulesStores";
const router = useRouter();
const rulesStore = useRulesStore();
/* punch-in 登录 */
const username = ref("");
const password = ref("");
// 隐私协议复选框
const isProtocolChecked = ref();
// 表单验证规则
const usernameRules = [{ validator: rulesStore.usernameValidate, trigger: "onBlur" }];
const passwordRules = [{ validator: rulesStore.passwordValidate, trigger: "onBlur" }];
const protocolRules = [{ validator: rulesStore.protocolValidate, trigger: "onSubmit" }];
/* 提交表单成功或失败回调 */
const onLoginSubmit = async () => {
	showLoadingToast("登录中...");
	try {
		const data = await loginApi({
			username: username.value,
			password: password.value,
		});
		showToast(data.message);
		router.push({ name: "index" });
	} catch (errMsg) {
		showToast(errMsg);
	}
};
const onLoginFailed = () => {
	showLoadingToast("验证表单规则中...");
	setTimeout(() => {
		closeToast();
	}, 0);
};
/* 跳转注册页面 */
const toRegister = () => {
	router.push({ name: "register" });
};
</script>
<style scoped>
/* 欢迎文本样式 */
.welcome-text span {
	font-size: 40px;
	padding-top: 20px;
	margin: 20px auto;
	display: block;
	color: var(--login-white-color);
}
/* 其他登录方式样式 */
.login-options {
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: var(--login-white-color);
	font-size: 16px;
}
/*  注册、忘记密码按钮样式 */
.extra-actions {
	position: fixed;
	width: 100%;
	bottom: 0;
}
.login-wrapper :deep(.van-grid-item__content) {
	background: transparent;
}
.login-wrapper :deep(.van-grid-item__text) {
	color: var(--login-protocol-color);
}
.login-wrapper :deep(.van-grid-item__content:after) {
	border-bottom: none;
}
.login-wrapper :deep(.van-grid-item__text) {
	font-size: 18px;
}
</style>
