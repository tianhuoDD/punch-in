<template>
	<van-tabs v-model:active="active" class="add-bill" type="card" animated swipeable>
		<van-tab name="income" title="收入">收入</van-tab>
		<van-tab name="expense" title="支出">
			<input-bill v-model="amountValue" :svg-name="'ice'" :category="'餐饮'" :account="'支付宝'" />
		</van-tab>
		<van-tab name="transfer" title="转账">转账</van-tab>
	</van-tabs>
	<!-- 日期按钮 -->
	<van-button class="date-button" @click="showCalendar = !showCalendar">选择日期</van-button>

	<!-- 日历组件 -->
	<van-calendar v-if="showCalendar" v-model:show="showCalendar" @confirm="onDateConfirm" />

	<van-number-keyboard
		v-model="amountValue"
		:show="true"
		theme="custom"
		extra-key="."
		close-button-text="确定"
		@close="createTransaction"
	/>
</template>
<script setup>
import { ref, watch } from "vue";
import InputBill from "@/components/InputBill.vue";
import { postTransactionApi } from "@/apis/transaction/index";
const amountValue = ref("");
const active = ref("expense");

// 控制 Calendar 组件显示
const showCalendar = ref(false);

// 处理日期选择
const onDateConfirm = (date) => {
	console.log("选择的日期:", date);
	showCalendar.value = false; // 关闭日期选择器
};

// 添加交易
const createTransaction = async () => {
	// const amount = ref(formatAmount(amountValue.value));
	amountValue.value = formatAmount(amountValue.value);
	console.log("金额：", amountValue.value);

	// try {
	// 	await postTransactionApi(data);
	// } catch (error) {
	// 	console.error("添加交易失败:", error);
	// }
};
const formatAmount = (value) => {
	if (value === "" || value === null || value === undefined) {
		return "0.00"; // 如果值为空，返回 "0.00"
	}

	// 只保留第一个有效小数点，去掉后面的内容
	value = value.toString().replace(/[^0-9.]/g, ""); // 只保留数字和小数点
	let firstDotIndex = value.indexOf(".");

	if (firstDotIndex !== -1) {
		value = value.substring(0, firstDotIndex + 1) + value.substring(firstDotIndex + 1).replace(/\./g, ""); // 仅保留第一个小数点
	}

	// 转换为数值
	let num = Number(value);

	// 如果转换失败，则返回 "0.00"
	if (isNaN(num)) {
		return "0.00";
	}

	// 处理小数点，确保不四舍五入，直接截取
	let strNum = num.toString();
	let decimalIndex = strNum.indexOf(".");

	if (decimalIndex !== -1) {
		// 截取到小数点后两位
		strNum = strNum.substring(0, decimalIndex + 3);
	} else {
		// 没有小数点，补 `.00`
		strNum += ".00";
	}

	// 确保小数部分至少有两位
	return strNum.padEnd(decimalIndex + 3, "0");
};
</script>
<style scoped>
/* 顶部tabs选项卡样式 */
.add-bill {
	height: 100%;
	padding-top: 10px;
	padding-bottom: 10px;
}
.add-bill :deep(.van-tabs__content) {
	height: 100%;
}
.add-bill :deep(.van-tabs__wrap) {
	padding-left: 50px;
	padding-right: 50px;
}
.add-bill :deep(.van-tabs__nav--card) {
	border-radius: 5px;
}
/* 日期按钮样式 */
.date-button {
	position: fixed;
	bottom: 250px;
}
</style>
