<template>
	<div class="login-wrapper">
		<div style="padding-top: 20px">
			<svg-icon name="left-arrow" @click="handleBackClick" />
		</div>
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
		<van-form style="margin-top: 20px" @submit="onSubmit">
			<van-cell-group inset>
				<van-field v-model="username" label="用户名" placeholder="用户名 / 邮箱" />
				<van-field v-model="password" type="password" label="密码" placeholder="密码" />
			</van-cell-group>
			<van-checkbox-group v-model="isProtocolChecked" shape="square" style="margin: 20px 30px">
				<van-checkbox name="a">我同意 《PunchIn用户服务协议》《隐私权政策》</van-checkbox>
			</van-checkbox-group>
			<div style="display: flex; justify-content: center; align-items: center">
				<van-button plain type="primary" class="login-button">立即登录</van-button>
			</div>
		</van-form>
		<!-- 注册、忘记密码按钮 -->
		<van-row class="extra-actions">
			<van-col :span="24">
				<van-grid column-num="2">
					<van-grid-item text="忘记密码" />
					<van-grid-item text="注册账号" />
				</van-grid>
			</van-col>
		</van-row>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
const router = useRouter();
// 隐私协议复选框
const isProtocolChecked = ref([]);

// 返回按钮点击事件
const handleBackClick = () => {
	router.back();
};
</script>
<style scoped>
.login-wrapper {
	height: 100%;
}
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
/* 登录表单样式 */
.login-wrapper .van-cell,
.login-wrapper .van-cell-group {
	background-color: transparent;
	caret-color: green;
}
.login-wrapper :deep(.van-field__body) {
	font-size: 18px;
}
.login-wrapper :deep(.van-cell__value) input {
	color: white;
}
.login-wrapper :deep(.van-cell__value) input::placeholder {
	color: var(--login-font-color);
}
.login-wrapper :deep(.van-cell__title) {
	display: none;
}
.login-wrapper .van-cell:last-child:after,
.login-wrapper .van-cell--borderless:after {
	display: block;
}
.login-wrapper .van-cell:after {
	border-bottom: 1px solid var(--login-white-color);
	transform: none;
}
/* 登录协议样式 */
.login-wrapper :deep(.van-checkbox__label) {
	color: var(--login-protocol-color);
	font-size: 12px;
}
.login-wrapper :deep(.van-badge__wrapper) {
	border-radius: 5px;
}
/* 登录按钮样式 */
.login-button {
	font-size: 18px;
	margin-top: 20px;
	border-radius: 20px;
	background: transparent;
	color: var(--login-white-color);
	border-color: var(--login-font-color);
	width: 120px;
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
