import { defineStore } from "pinia";
import { ref } from "vue";
// 切换侧边栏状态
export const useRulesStore = defineStore("rules", () => {
	// 存储密码
	const passwordRef = ref(""); // 存储密码的值
	// 用户名验证方法
	const usernameValidate = (value) => {
		if (!value) {
			return "请输入用户名";
		}
		if (value.length < 4 || value.length > 16) {
			return "用户名长度应在4到16个字符之间";
		}
		if (!/^[a-zA-Z0-9_]+$/.test(value)) {
			return "用户名只能包含字母、数字和下划线";
		}
		return true;
	};
	// 密码验证方法
	const passwordValidate = (value) => {
		if (!value) {
			return "请输入密码";
		}
		if (value.length < 5 || value.length > 20) {
			return "密码长度应在5到20个字符之间";
		}
		if (!/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/.test(value)) {
			return "密码必须包含字母和数字";
		}
		// 将密码存储在 passwordRef 中
		passwordRef.value = value;

		return true;
	};
	// 确认密码验证方法
	const confirmPasswordValidate = (value) => {
		// 获取存储的密码值
		const password = passwordRef.value;

		if (!value) {
			return "请确认密码";
		}
		if (value !== password) {
			return "两次密码输入不一致";
		}

		return true;
	};
	// 邮箱验证方法
	const emailValidate = (value) => {
		if (!value) {
			return "请输入电子邮件地址";
		}
		const emailPattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5]+)@([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,8})$/;
		if (!emailPattern.test(value)) {
			return "电子邮件地址格式不正确";
		}
		return true;
	};
	// 验证码验证方法 6位
	const captchaValidate = (value) => {
		if (!value) {
			return "请输入验证码";
		}
		if (!/^\d{6}$/.test(value)) {
			return "验证码应为6位数字";
		}
		return true;
	};
	// 验证码验证方法 4位
	const securityValidate = (value) => {
		if (!value) {
			return "请输入验证码";
		}
		if (!/^\d{4}$/.test(value)) {
			return "验证码应为4位数字";
		}
		return true;
	};
	// 协议复选框验证方法
	const protocolValidate = (value) => {
		if (!value) {
			return "请同意用户服务协议和隐私权政策";
		}
		return true;
	};
	return {
		usernameValidate,
		passwordValidate,
		confirmPasswordValidate,
		emailValidate,
		captchaValidate,
		protocolValidate,
		securityValidate,
	};
});
