import { defineStore } from "pinia";
import { ref } from "vue";
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
	 * 生成完整的图片 URL
	 *
	 * @param {string} path - 图片路径（相对路径）
	 * @returns {string} 完整的图片 URL
	 */
	const getImageUrl = (path) => {
		const baseUrl = import.meta.env.VITE_APP_BASE_API;
		return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
	};
	return {
		calculateDaysDifference,
		formatTime,
		getImageUrl,
	};
});
