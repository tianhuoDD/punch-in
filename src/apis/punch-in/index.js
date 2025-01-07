import romAxios from "../request";
const baseUrl = "/punch_records";
// 获取所有打卡记录
export const getPunchRecordsApi = async () => {
	const res = await romAxios.requestJson(romAxios.get, baseUrl + "/");
	return res; // 返回 response.data
};

// 获取单个打卡记录
export const getPunchRecordByIdApi = async (recordId) => {
	const res = await romAxios.requestJson(romAxios.get, baseUrl + `/${recordId}`);
	return res;
};

// 创建新的打卡项
export const createPunchRecordApi = async ({ title }) => {
	const data = { title };
	const res = await romAxios.requestJson(romAxios.post, baseUrl + "/", data);
	return res;
};
