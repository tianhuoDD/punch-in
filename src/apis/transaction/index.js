import romAxios from "../request.js";
const transaction_URL = "/transaction";
// 获取所有交易记录
export const getTransactionsApi = async () => {
	return await romAxios.requestJson(romAxios.get, transaction_URL + "/");
};
// 获取单个交易记录
export const getTransactionApi = async (id) => {
	return await romAxios.requestJson(romAxios.get, transaction_URL + `/${id}`);
};
// 添加新交易
export const postTransactionApi = async (data) => {
	return await romAxios.requestJson(romAxios.post, transaction_URL + "/", data);
};

// 更新交易
export const putTransactionApi = async (id, data) => {
	return await romAxios.requestJson(romAxios.put, transaction_URL + `/${id}`, data);
};

// 删除交易
export const deleteTransactionApi = async (id) => {
	return await romAxios.requestJson(romAxios.delete, transaction_URL + `/${id}`);
};
