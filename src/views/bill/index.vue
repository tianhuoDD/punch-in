<template>
	<div class="bill">
		<van-sticky>
			<van-nav-bar title="默认账本" />
		</van-sticky>
		<van-steps direction="vertical" :active="-1" class="bill-steps">
			<!-- 总计提示 -->
			<van-step class="step-total">
				<template #inactive-icon>
					<i class="total-bg"></i>
					<div class="total-text">
						<p style="margin-bottom: 5px">月预算</p>
						<p>3000.00</p>
					</div>
				</template>
				<div class="step-total-title-right">
					<p class="title">1月支出</p>
					<p class="title">{{ totalExpense.toFixed(2) }}</p>
				</div>
				<div class="step-total-title-left">
					<p class="title">1月收入</p>
					<p class="title">{{ totalIncome.toFixed(2) }}</p>
				</div>
			</van-step>
			<!-- 循环打印交易记录 -->
			<van-step v-for="(transaction, index) in transactions" :key="index" class="step-date">
				<template #inactive-icon>
					<svg-icon :name="transaction.svg" padding="0px" />
				</template>
				<!-- 显示支出，确保 0 也显示 -->
				<span v-if="transaction.expense !== null && transaction.expense !== undefined" class="title">
					{{ transaction.category }} {{ transaction.expense.toFixed(2) }}
				</span>
				<!-- 显示收入，确保 0 也显示 -->
				<span v-if="transaction.income !== null && transaction.income !== undefined" class="title income">
					{{ transaction.income.toFixed(2) }} {{ transaction.category }}
				</span>
			</van-step>

			<!-- 最底部的笑脸提示 -->
			<van-step style="margin-bottom: 120px">
				<template #inactive-icon>
					<svg-icon
						name="smile"
						padding="0px"
						width="30px"
						height="30px"
						color="var(--font-black-color)"
						style="background-color: white"
					/>
				</template>
			</van-step>
		</van-steps>
	</div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useTransactionStore } from "@/stores/transactionStores";
import { getTransactionsApi } from "@/apis/transaction/index.js";
const transactionStore = useTransactionStore();
// 初始化变量
const transactions = computed(() => transactionStore.transactions);
const totalIncome = computed(() =>
	transactionStore.transactions
		.filter((t) => t.income !== null) // 筛选收入
		.reduce((sum, t) => sum + Number(t.income), 0),
);
const totalExpense = computed(() =>
	transactionStore.transactions
		.filter((t) => t.expense !== null) // 筛选支出
		.reduce((sum, t) => sum + Number(t.expense), 0),
);

onMounted(() => {
	fetchTransactions();
});
// 获取交易数据
const fetchTransactions = async () => {
	try {
		const { data } = await getTransactionsApi();
		transactionStore.transactions = data;
		// calculateTotals(); // 计算总收入和支出
	} catch (errMsg) {
		showToast(errMsg);
	}
};

// 格式化日期
const formatDate = (dateString) => {
	const date = new Date(dateString);
	return `${date.getMonth() + 1}月${date.getDate()}日`;
};
</script>
<style scoped>
.title {
	font-size: 16px;
	color: var(--font-black-color);
}
.income {
	position: relative;
	left: -128px;
}
.bill {
	display: flex;
	flex-direction: column;
	height: auto;
}
.bill-steps {
	flex: 1;
}
.bill-steps :deep(.van-steps__items) {
	min-width: 108px;
	max-width: 108px;
}
.bill :deep(.van-hairline) {
	padding-left: 10px;
}
/* 步骤条统一样式 */
.bill .van-hairline:first-child {
	padding-bottom: 120px;
	margin-bottom: 0;
}
.bill .van-hairline {
	padding-bottom: 40px; /* 线条长度 */
	margin-bottom: 25px;
}
.bill :deep(.van-step__line) {
	background-color: var(--line-gray-color);
	top: auto;
}
.bill .van-steps {
	display: flex;
	justify-content: center;
	padding-left: 137.7px; /* 步骤条位置 */
	padding-top: 50px; /* 线条长度 */
}
/* 总计提示样式 */
.step-total {
	position: relative;
}
.step-total .total-bg {
	width: 70px;
	height: 70px;
	background-color: var(--bg-blue2-color);
	border-radius: 50%;
	display: block;
}
.step-total .total-text {
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--font-white-color);
	font-size: 12px;
	white-space: nowrap;
}
.step-total-title-right {
	position: absolute;
	right: -10px;
	text-align: center;
}
.step-total-title-left {
	position: absolute;
	left: -150px;
	text-align: center;
}
/* 当日记账提示样式 */
.step-date {
	position: relative; /* 让子元素相对于 van-step 进行定位 */
}
.step-date .date-bg {
	width: 30px;
	height: 30px;
	background-color: var(--bg-gray2-color);
	border-radius: 50%;
	display: block;
}
.step-date .date-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--font-white-color);
	font-size: 12px;
	white-space: nowrap;
}
/* 每个 step右侧描述 的样式 */
.bill :deep(.van-step--vertical:not(:last-child):after) {
	border: 0;
}
</style>
