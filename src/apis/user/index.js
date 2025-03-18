import romAxios from "../request.js";
const USER_URL = "/user";
// 修改头像接口
export const postAvatarApi = async (data) => {
	const res = await romAxios.requestFile(romAxios.post, USER_URL + "/upload_avatar", data);
	return res;
};
// 修改昵称接口
export const postNicknameApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, USER_URL + "/update_nickname", data);
	return res;
};
// 修改邮箱接口
export const postEmailApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, USER_URL + "/update_email", data);
	return res;
};
