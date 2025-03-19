import romAxios from "../request.js";
const svg_URL = "/svg";
// 获取所有SVG接口
export const getSVGApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.get, svg_URL + "/", data);
	return res;
};
// 获取用户SVG接口
export const getUserSVGApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.get, svg_URL + "/user", data);
	return res;
};
// 添加用户SVG接口
export const postUserSVGApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, svg_URL + "/user-svg", data);
	return res;
};
// 更新用户SVG接口
export const updateUserSVGApi = async (svgId, data) => {
	const res = await romAxios.requestJson(romAxios.put, svg_URL + "/user-svg/" + svgId, data);
	return res;
};
