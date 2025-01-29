import romAxios from "../request.js";

// 登录接口
export const postLoginApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, "/login", data);
	return resData;
};
// 注册接口
export const postRegisterApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, "/register", data);
	return resData;
};
