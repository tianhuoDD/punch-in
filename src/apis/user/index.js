import romAxios from "../request.js";
const USER_URL = "/user";
// 修改昵称接口
export const postNicknameApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, USER_URL + "/update_nickname", data);
	return resData;
};
// 修改邮箱接口
export const postEmailApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, USER_URL + "/update_email", data);
	return resData;
};
