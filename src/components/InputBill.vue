<template>
	<van-field
		v-model="formattedValue"
		type="number"
		class="input-bill"
		placeholder="0.00"
		input-align="right"
		size="large"
		readonly
	>
		<template #label>
			<svg-icon name="ice" padding="0" />
			<span class="title">餐饮</span>
		</template>
	</van-field>
</template>

<script setup>
import { ref, watch } from "vue";
import SvgIcon from "./SvgIcon.vue";

// 初始化金额值
const amountValue = ref("0.00");

// 用于格式化的值
const formattedValue = ref(amountValue.value);

// 监听 amountValue 变化并格式化
watch(amountValue, (newValue) => {
	formattedValue.value = formatAmount(newValue);
});

// 格式化金额的函数
const formatAmount = (value) => {
	// 如果没有小数点，保留整数部分，添加 .00
	if (!value.includes(".")) {
		return value + ".00";
	}

	// 否则保留两位小数
	let [integer, decimal] = value.split(".");
	decimal = decimal.substring(0, 2); // 保留两位小数
	return integer + "." + decimal;
};
</script>

<style scoped>
.input-bill :deep(.van-cell__title) {
	display: flex;
	align-items: center;
}
.title {
	font-size: 20px;
}
.input-bill :deep(.van-field__body) {
	font-size: 28px;
}
</style>
