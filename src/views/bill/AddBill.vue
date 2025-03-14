<template>
	<van-tabs v-model:active="active" class="add-bill" type="card" animated swipeable>
		<van-tab name="income" title="收入">收入</van-tab>
		<van-tab name="expense" title="支出">
			<input-bill v-model="amountValue" :svg-name="iconName" :category="'餐饮'" :account="'支付宝'" />
			<svg-bill class="svg-bill" @icon-click="handleIconClick" />
		</van-tab>
		<van-tab name="transfer" title="转账">转账</van-tab>
		<template #nav-bottom>
			<svg-icon name="cross" size="20px" class="close-icon" @click="handleClose" />
		</template>
	</van-tabs>
	<div class="button-container">
		<!-- 日期按钮 -->
		<custom-button class="date-button" @click="showCalendar = !showCalendar">{{
			formattedDate ? formattedDate : "选择日期"
		}}</custom-button>
		<!-- 账户按钮 -->
		<custom-button class="account-button" @click="showCalendar = !showCalendar">现金</custom-button>
		<!-- 备注按钮 -->
		<custom-button class="remark-button" @click="showCalendar = !showCalendar">备注</custom-button>
	</div>
	<!-- 日历组件 -->
	<van-calendar
		v-if="showCalendar"
		v-model:show="showCalendar"
		title="记账日期选择"
		:min-date="new Date(2025, 1, 1)"
		:show-confirm="false"
		@select="getSelectedDate"
	/>
	<!-- 数字键盘 -->
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import CustomButton from "@/components/bill/CustomButton.vue";
import InputBill from "@/components/bill/InputBill.vue";
import SvgBill from "@/components/bill/SvgBill.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useUtilsStore } from "@/stores/utilsStores";
import { postTransactionApi } from "@/apis/transaction/index";
const utilsStore = useUtilsStore();
const router = useRouter();
// 控制 Calendar 组件显示
const showCalendar = ref(false);
const active = ref("expense");
const iconName = ref("icon_bonus");
// 初始化账单变量
const amountValue = ref(""); // 金额
const formattedDate = ref(utilsStore.formatDateToMMDD(new Date())); // 格式化后的日期
const dateValue = ref(utilsStore.formatDateToYYYYMMDD(new Date())); // 传给后端的日期

// 图标点击事件
const handleIconClick = (icon) => {
	iconName.value = icon;
};
// 添加交易
const createTransaction = async () => {
	amountValue.value = formatAmount(amountValue.value);
	const data = {
		income: amountValue.value,
		svg: "ice",
		category: "餐饮",
		account: "支付宝",
		date: dateValue.value,
		remark: "备注",
	};
	try {
		await postTransactionApi(data);
		showToast("添加成功");
		router.back();
	} catch (error) {
		console.error("添加交易失败:", error);
	}
};
// 关闭按钮
const handleClose = () => {
	router.back();
};
// 处理日期选择
const getSelectedDate = (date) => {
	// 确保日期格式为 YYYY-MM-DD
	formattedDate.value = utilsStore.formatDateToMMDD(date);
	dateValue.value = utilsStore.formatDateToYYYYMMDD(date);
	setTimeout(() => {
		showCalendar.value = false; // 关闭日期选择器
	}, 100);
};
// 格式化金额，确保小数点后最多两位，并确保小数点前至少有一个数字
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
	width: 100%;
	padding-top: 10px;
	padding-bottom: 10px;
}

.add-bill :deep(.van-tabs__wrap) {
	padding-left: 50px;
	padding-right: 50px;
}
.add-bill :deep(.van-tabs__nav--card) {
	border-radius: 5px;
}
/* 关闭按钮 */
.close-icon {
	position: fixed;
	top: 5px;
	right: 10px;
}
/* 按钮容器样式 */
.button-container {
	position: fixed;
	bottom: 245px;
	width: 100%;
	height: 35px;
	border-top: 1px solid #e5e5e5;
	background: rgba(255, 255, 255, 0.8); /* 透明白色背景 */
}

/* 日期按钮样式 */
.date-button {
	position: fixed;
	bottom: 250px;
	left: 5px;
}
/* 账号按钮样式 */
.account-button {
	position: fixed;
	bottom: 250px;
	left: 95px;
}
/* 备注按钮样式 */
.remark-button {
	position: fixed;
	bottom: 250px;
	right: 5px;
}
/* 图标组件样式 */
.svg-bill {
	overflow-y: auto; /* 溢出时可滑动 */
	height: 390px;
}
</style>
