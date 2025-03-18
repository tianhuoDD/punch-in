import romAxios from "../request.js";
const transaction_URL = "/transaction";
// 获取所有交易记录
export const getTransactionsApi = async () => {
	const res = await romAxios.requestJson(romAxios.get, transaction_URL + "/");
	return res;
};
// 获取单个交易记录
export const getTransactionApi = async (id) => {
	const res = await romAxios.requestJson(romAxios.get, transaction_URL + `/${id}`);
	return res;
};
// 添加新交易
export const postTransactionApi = async (data) => {
	const res = await romAxios.requestJson(romAxios.post, transaction_URL + "/", data);
	return res;
};

// 更新交易
export const putTransactionApi = async (id, data) => {
	const res = await romAxios.requestJson(romAxios.put, transaction_URL + `/${id}`, data);
	return res;
};

// 删除交易
export const deleteTransactionApi = async (id) => {
	const res = await romAxios.requestJson(romAxios.delete, transaction_URL + `/${id}`);
	return res;
};
