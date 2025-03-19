<template>
	<div class="bill">
		<van-nav-bar title="默认账本" />
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
					<p class="title">{{ totalExpense }}</p>
				</div>
				<div class="step-total-title-left">
					<p class="title">1月收入</p>
					<p class="title">{{ totalIncome }}</p>
				</div>
			</van-step>
			<!-- 循环打印交易记录 -->
			<van-step v-for="(transaction, index) in transactions" :key="index" class="step-date">
				<template #inactive-icon>
					<i class="date-bg"></i>
					<span class="date-text">{{ formatDate(transaction.date) }}</span>
				</template>
				<span class="title"
					>{{ transaction.type === "expense" ? "支出" : "收入" }}
					{{ transaction.income ? transaction.income : "0.00" }}</span
				>
			</van-step>

			<!-- 最底部提示 -->
			<van-step>
				<template #inactive-icon>
					<svg-icon name="smile" padding="0" width="30px" height="30px" color="var(--font-black-color)" />
				</template>
			</van-step>
		</van-steps>
	</div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useTransactionStore } from "@/stores/transactionStores";
import { getTransactionsApi } from "@/apis/transaction/index.js";
import { showToast } from "vant";
const transactionStore = useTransactionStore();
// 初始化变量
const transactions = computed(() => transactionStore.transactions);
const totalIncome = ref(0);
const totalExpense = ref(0);

onMounted(() => {
	fetchTransactions();
});
// 获取交易数据
const fetchTransactions = async () => {
	try {
		const { data } = await getTransactionsApi();
		transactionStore.transactions = data;
		calculateTotals(); // 计算总收入和支出
	} catch (errMsg) {
		showToast(errMsg);
	}
};
// 计算总收入和总支出
const calculateTotals = () => {
	totalIncome.value = transactions.value
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + Number(t.amount), 0);

	totalExpense.value = transactions.value
		.filter((t) => t.type === "expense")
		.reduce((sum, t) => sum + Number(t.amount), 0);
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
.bill {
	display: flex;
	flex-direction: column;
	height: auto;
}
.bill-steps {
	flex: 1;
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
	padding-bottom: 50px; /* 线条长度 */
	margin-bottom: 25px;
}
.bill :deep(.van-step__line) {
	background-color: var(--line-gray-color);
	top: auto;
}
.bill .van-steps {
	display: flex;
	justify-content: center;
	padding-left: 110px;
	padding-top: 50px;
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
	right: -40px;
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
