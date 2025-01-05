import romAxios from "../request";
// 获得所有打卡卡片
export const getClockInsApi = async ({ page = 1, per_page = 20 } = {}) => {
	const res = await romAxios.requestJson(romAxios.get, "/getAllClockIns", { page, per_page });
	return res; // 由于成功拦截器返回的是 response.data，这里 res 是 response.data
};
// 新增打卡卡片
export const postClockInApi = async ({ title, content, img }) => {
	const formData = new FormData();
	formData.append("title", title);
	formData.append("content", content);
	if (img && img.file) {
		formData.append("img", img.file);
	}
	const res = await romAxios.requestForm(romAxios.post, "/addClockIn", formData);
	return res; // 由于成功拦截器返回的是 response.data，这里 res 是 response.data
};
