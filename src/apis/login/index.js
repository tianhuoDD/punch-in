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
