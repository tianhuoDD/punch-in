import { defineStore } from "pinia";
// 切换侧边栏状态
export const useUtilsStore = defineStore("utils", () => {
	/**
	 * 计算传入时间与当前时间相差的天数（向上取整）
	 * @param {string} inputDate - 传入的时间字符串，格式如 "Tue, 28 Jan 2025 08:17:53 GMT"
	 * @returns {number} - 相差的天数（向上取整）
	 */
	const calculateDaysDifference = (inputDate) => {
		// 将传入的时间字符串转换为 Date 对象
		const targetDate = new Date(inputDate);

		// 获取当前时间
		const currentDate = new Date();

		// 计算时间差（以毫秒为单位）
		const timeDifference = Math.abs(currentDate - targetDate);

		// 将时间差转换为天数（向上取整）
		const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

		return daysDifference;
	};
	/**
	 * 格式化时间为 "YYYY-MM-DD HH:mm:ss" 格式
	 *
	 * @param {string|number|Date} time - 需要格式化的时间，可以是时间字符串、时间戳或 Date 对象
	 * @returns {string} 格式化后的时间字符串，例如 "2025-01-20 08:17:53"
	 */
	const formatTime = (time) => {
		return new Date(time).toISOString().replace("T", " ").split(".")[0];
	};
	/**
	 * 格式化日期为 YYYY-MM-DD 格式
	 * @param {Date} date - 需要格式化的日期对象
	 * @returns {string} 返回格式化后的字符串，格式为 YYYY-MM-DD
	 */
	const formatDateToYYYYMMDD = (date) => {
		// 参数必须是 Date 对象
		if (!(date instanceof Date)) {
			return "2000-01-01";
		}

		const year = date.getFullYear(); // 获取四位年份
		const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份补零
		const day = String(date.getDate()).padStart(2, "0"); // 日期补零

		return `${year}-${month}-${day}`; // 返回 YYYY-MM-DD 格式的字符串
	};
	/**
	 * 格式化日期为 MM月DD日 格式
	 * @param {Date} date - 需要格式化的日期对象
	 * @returns {string} 返回格式化后的字符串，格式为 MM月DD日
	 */
	const formatDateToMMDD = (date) => {
		// 参数必须是 Date 对象
		if (!(date instanceof Date)) {
			return "01月01日";
		}

		const month = String(date.getMonth() + 1).padStart(2, "0"); // 补零
		const day = String(date.getDate()).padStart(2, "0"); // 补零

		return `${month}月${day}日`;
	};

	/**
	 * 生成完整的图片 URL
	 *
	 * @param {string} path - 图片路径（相对路径）
	 * @returns {string} 完整的图片 URL
	 */
	const getImageUrl = (path) => {
		const baseUrl = import.meta.env.VITE_APP_BASE_API;
		return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
	};
	/**
	 * 生成一个随机验证码
	 * @param {number} length - 验证码的长度
	 * @param {string} characterSet - 用于生成验证码的字符集（可以包含字母、数字、特殊字符等）
	 * @returns {string} - 生成的随机验证码
	 */
	const generateRandomCode = (characterSet, length) => {
		let randomCode = ""; // 初始化空字符串，用于存放生成的验证码
		// 循环生成验证码，直到达到指定长度
		for (let i = 0; i < length; i++) {
			// 随机从字符集里选择一个字符并添加到验证码字符串中
			randomCode += characterSet[randomNum(0, characterSet.length)];
		}

		return randomCode; // 返回生成的验证码
	};

	/**
	 * 生成一个指定范围内的随机整数
	 * @param {number} min - 随机数的最小值（包含）
	 * @param {number} max - 随机数的最大值（不包含）
	 * @returns {number} - 生成的随机整数
	 */
	const randomNum = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min); // 使用Math.random生成一个随机数并映射到指定范围
	};
	return {
		calculateDaysDifference,
		formatTime,
		getImageUrl,
		formatDateToYYYYMMDD,
		formatDateToMMDD,
		generateRandomCode,
		randomNum,
	};
});
