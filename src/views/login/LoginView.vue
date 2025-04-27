<template>
	<div class="login-wrapper">
		<!-- (输入框聚焦时隐藏) -->
		<div v-show="!isInputFocused">
			<!-- 欢迎文本 -->
			<van-row class="welcome-text">
				<span>你好，开发者!</span>
			</van-row>
			<!-- 其他登录方式 -->
			<van-row>
				<van-col :span="12" class="login-options" style="border-right: 1px solid var(--login-font-color)">
					<svg-icon name="qq" />
					<span>QQ登录</span>
				</van-col>
				<van-col :span="12" class="login-options">
					<svg-icon name="wechat_fill" />
					<span>微信登录</span>
				</van-col>
			</van-row>
			<!-- 分隔线 -->
			<van-divider :style="{ color: 'var(--login-font-color)' }"> 使用 PunchIn 账户登录 </van-divider>
		</div>
		<div v-show="isInputFocused" style="height: 20vh"></div>
		<!-- 登录表单 -->
		<van-form ref="loginFormRef" style="margin-top: 20px" validate-first>
			<van-cell-group inset>
				<van-field
					v-model="username"
					name="username"
					label="用户名"
					placeholder="用户名 / 邮箱"
					:rules="usernameRules"
					@focus="isInputFocused = true"
					@blur="isInputFocused = false"
				/>
				<van-field
					v-model="password"
					name="password"
					type="password"
					label="密码"
					placeholder="密码"
					:rules="passwordRules"
					@focus="isInputFocused = true"
					@blur="isInputFocused = false"
				/>
				<van-field name="protocol" label="复选框" :rules="protocolRules">
					<template #input>
						<van-button class="invisible-button" @mousedown="handleProtocolMouseDown">
							<van-checkbox v-model="isProtocolChecked" shape="square">
								我同意 《PunchIn用户服务协议》《隐私权政策》
							</van-checkbox>
						</van-button>
					</template>
				</van-field>
			</van-cell-group>
			<div style="display: flex; justify-content: center; align-items: center">
				<van-button plain type="primary" native-type="submit" class="login-reg-button" @mousedown="handleLoginSubmit"
					>立即登录</van-button
				>
			</div>
		</van-form>
		<!-- 注册、忘记密码按钮（输入框聚焦时隐藏） -->
		<van-row v-show="!isInputFocused" class="extra-actions">
			<van-col :span="24">
				<van-grid column-num="2">
					<van-grid-item text="忘记密码" @click="goForget" />
					<van-grid-item text="注册账号" @click="goRegister" />
				</van-grid>
			</van-col>
		</van-row>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import "@/styles/loginFormField.css";
import SvgIcon from "@/components/SvgIcon.vue";
import { postLoginApi } from "@/apis/login/index";
import { useRulesStore } from "@/stores/rulesStores";
import { useUserStore } from "@/stores/userStores";
const router = useRouter();
const rulesStore = useRulesStore();
const userStore = useUserStore();
const loginFormRef = ref();
// punch-in 登录
const username = ref("");
const password = ref("");
// 隐私协议复选框
const isProtocolChecked = ref(false);
// 是否聚焦于输入框
const isInputFocused = ref(false);
// 表单验证规则
const usernameRules = [{ validator: rulesStore.usernameValidate, trigger: "onBlur" }];
const passwordRules = [{ validator: rulesStore.passwordValidate, trigger: "onBlur" }];
const protocolRules = [{ validator: rulesStore.protocolValidate, trigger: "onSubmit" }];
/*  鼠标按下则触发按钮 - 解决输入框聚焦时，无法点击登录的问题
		@rom:error 由于使用了@mousedown的原因，导致连续多次点击复选框按钮
		时，复选框状态不会及时更新；可能时@mousedown事件，互相竞争，没有触发
		event.target.closest()
*/
const handleProtocolMouseDown = (event) => {
	event.preventDefault(); // 阻止默认行为，避免选中文本等问题

	// 如果点击的元素是 van-checkbox，直接 return，避免多次触发
	if (event.target.closest(".van-checkbox")) {
		console.log("点击的是复选框，跳过 handleProtocolMouseDown");
		return;
	}
	isProtocolChecked.value = !isProtocolChecked.value;
};

// 提交表单
const handleLoginSubmit = async (event) => {
	event.preventDefault();
	// 验证表单项
	await loginFormRef.value.validate();
	showLoadingToast("登录中...");
	try {
		const { message, data } = await postLoginApi({
			username: username.value,
			password: password.value,
		});
		if (data.token) {
			userStore.setToken(data.token); // 存储 token
			userStore.setUserInfo(data.user_info); // 存储 userInfo
			showToast(message);
			router.push({ name: "index" });
		} else {
			showToast("没有获取到Token,登录失败...");
		}
	} catch (errMsg) {
		showToast(errMsg);
	}
};
// 跳转忘记密码页面
const goForget = () => {
	router.push({ name: "forget" });
};
// 跳转注册页面
const goRegister = () => {
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
	background-color: var(--login-bg);
}
.login-wrapper {
	min-height: 600px;
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
/* 隐藏按钮 */
.invisible-button {
	background: none; /* 移除背景 */
	border: none; /* 移除边框 */
	padding: 0; /* 移除内边距 */
	width: auto;
	height: auto;
	display: inline; /* 避免额外的块级占位 */
	color: transparent; /* 让文字不可见 */
}
</style>
