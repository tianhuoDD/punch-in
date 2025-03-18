// src/utils/request.js
import romAxios from "@rom/axios";
import router from "@/router";
romAxios.initAxios({
	baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径，可在 .env 文件中配置
	timeout: 20000, // 请求超时时间
});
romAxios.addResponseInterceptor(
	(res) => {
		// 解析后端返回数据
		const { success, message } = res || {};
		if (success) {
			return Promise.resolve(res); // 返回完整结构
		} else {
			showToast(message || "响应成功,请求失败");
			return Promise.reject(message);
		}
	},
	({ errMsg, response }) => {
		// 确保 response 和 response.data 存在
		const msg = response?.data?.message || errMsg || "响应失败";
		// token 检查
		if (!response?.data?.data?.token) {
			showToast(msg);
			router.push({ name: "login" });
		}
		console.error("错误的 response：", response);
		return Promise.reject(msg);
	},
);

export default romAxios;

/*
2xx 成功：

    200 OK：请求成功，适用于 GET、PUT、PATCH、DELETE。
    201 Created：成功创建资源。
    204 No Content：请求成功但无返回内容，常用于 DELETE。

4xx 客户端错误：

    400 Bad Request：请求格式错误或参数无效。
    401 Unauthorized：未授权，需身份验证。
    403 Forbidden：禁止访问，权限不足。
    404 Not Found：资源不存在。
    409 Conflict：资源冲突（如重复创建）。

5xx 服务器错误：

    500 Internal Server Error：服务器内部错误。
    503 Service Unavailable：服务不可用。
*/
