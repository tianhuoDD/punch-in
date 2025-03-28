<template>
	<van-divider class="input-divider" style="margin-top: 10px" />
	<van-field
		v-model="formattedModel"
		readonly
		type="number"
		class="input-bill"
		placeholder="0.00"
		input-align="right"
		size="large"
	>
		<template #label>
			<svg-icon :name="svgName" padding="0px" width="40px" height="40px" />
			<span class="title">{{ category }}</span>
		</template>
	</van-field>
</template>

<script setup>
import { computed } from "vue";
import { useVModel } from "@vueuse/core";
import SvgIcon from "../SvgIcon.vue";

const formattedModel = computed({
	get: () => formatValue(model.value),
	set: (newValue) => {
		// 去除首尾空格
		let val = newValue.trim();

		// 过滤非数字和小数点
		val = val.replace(/[^\d.]/g, "");

		// 避免以 `.` 开头
		if (val.startsWith(".")) {
			val = "0" + val;
		}

		// 只保留一个 `.`
		val = val.replace(/^(\d*\.\d*)\./, "$1");

		// 处理小数点后最多两位
		const parts = val.split(".");
		if (parts.length === 1) {
			// 没有小数点，补充 `.00`
			val = parts[0].replace(/^0+(\d)/, "$1") + ".00";
		} else {
			// 处理小数部分
			let intPart = parts[0].replace(/^0+(\d)/, "$1"); // 移除多余的前导 0
			if (intPart === "") intPart = "0"; // 避免清空整数部分

			let decimalPart = parts[1].padEnd(2, "0").slice(0, 2); // 确保小数部分两位
			val = `${intPart}.${decimalPart}`;
		}

		// 更新 modelValue，避免无限递归
		model.value = val;
	},
});
// 定义 props
const props = defineProps({
	modelValue: {
		type: [Number, String],
		default: 0,
	},
	svgName: {
		type: String,
		default: "",
	},
	category: {
		type: String,
		default: "",
	},
	account: {
		type: String,
		default: "",
	},
});
// 使用 useVModel 处理双向绑定
const model = useVModel(props, "modelValue");
// 格式化金额，确保最大两位小数
const formatValue = (value) => {
	// 如果为空值，返回默认的 0.00
	if (value === null || value === undefined || value === "") {
		return "0.00";
	}
	// 转换为字符串并去除多余的空格
	let val = value.toString().trim();
	// 过滤掉非数字和小数点
	val = val.replace(/[^\d.]/g, "");
	// 避免以 `.` 开头
	val = val.replace(/^\./, "");
	// 只保留一个 `.`
	val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	// 限制小数点后最多两位
	val = val.replace(/^(\d+)\.(\d{2}).*$/, "$1.$2");
	// 如果没有小数部分，自动补上 .00
	if (!val.includes(".")) {
		val += ".00";
	}
	// 返回格式化后的金额
	return val;
};
</script>

<style scoped>
.input-bill :deep(.van-cell__title) {
	display: flex;
	align-items: center;
	width: auto;
}
.title {
	margin-left: 10px;
	font-size: 20px;
}
.input-bill :deep(.van-field__body) {
	font-size: 28px;
}
.input-bill :deep(.van-field) {
	padding: 0px;
}
.input-divider {
	margin: 0px;
	width: 344px;
}
</style>
