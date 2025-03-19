// store/transactionStores.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransactionStore = defineStore("transaction", () => {
	// 账单列表，使用 ref 存储可响应式数据
	const transactions = ref([]);
	// 用户svg列表
	const userSvgList = ref();
	// 全部svg
	const allSvgList = ref();
	return {
		transactions,
		userSvgList,
		allSvgList,
	};
});
