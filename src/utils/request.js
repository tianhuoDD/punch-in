// src/utils/request.js
import axios from "axios";
import { Toast } from "vant";

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径，可在 .env 文件中配置
	timeout: 5000, // 请求超时时间
});
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

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么，比如添加 token
		return config;
	},
	(error) => {
		// 处理请求错误
		return Promise.reject(error);
	},
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做些什么
		return response.data;
	},
	(error) => {
		Toast.fail(error.message || "请求失败");
		// 处理响应错误
		return Promise.reject(error);
	},
);

export default service;
