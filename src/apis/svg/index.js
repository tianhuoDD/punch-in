import romAxios from "../request.js";
const svg_URL = "/svg";
// 获取所有SVG接口
export const getSVGApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.get, svg_URL + "/", data);
	return resData;
};
// 获取用户SVG接口
export const getUserSVGApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.get, svg_URL + "/user", data);
	return resData;
};
// 添加用户SVG接口
export const postUserSVGApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, svg_URL + "/user-svg", data);
	return resData;
};
