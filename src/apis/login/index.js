import romAxios from "../request.js";

// 登录接口
export const postLoginApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/login", data);
	return res;
};
// 注册接口
export const postRegisterApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/register", data);
	return res;
};
// 发送邮箱验证码
export const postSendEmailCodeApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, "/send-email-code", data);
	return res;
};
