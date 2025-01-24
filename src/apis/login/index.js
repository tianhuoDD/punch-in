import romAxios from "../request.js";

export const loginApi = async (data) => {
	const resData = await romAxios.requestJson(romAxios.post, "/login", data);
	return resData;
};
