import romAxios from "../request.js";

// 登录
export const postLoginApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/login", data);
	return res;
};
// 注册
export const postRegisterApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/register", data);
	return res;
};
// 重置密码
export const postResetPasswordApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/reset-password", data);
	return res;
};
// 发送邮箱验证码
export const postSendEmailCodeApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/send-email-code", data);
	return res;
};
// 验证邮箱验证码
export const postVerifyEmailCodeApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/verify-email-code", data);
	return res;
};
// 验证邮箱是否存在
export const postCheckEmailExistApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/check-email-exist", data);
	return res;
};
