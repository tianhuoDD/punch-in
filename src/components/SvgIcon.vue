<template>
	<svg aria-hidden="true" :style="{ width: computedWidth, height: computedHeight, padding }">
		<use :href="`#${prefix}-${name}`" :fill="color" />
	</svg>
</template>

<script setup>
import { computed } from "vue";
// 计算最终的宽度和高度，如果传递了 size，则使用 size
const computedWidth = computed(() => (props.size ? props.size : props.width || "30px"));
const computedHeight = computed(() => (props.size ? props.size : props.height || "30px"));
// 定义 props
const props = defineProps({
	prefix: {
		type: String,
		default: "icon",
	},
	name: {
		type: String,
		required: true,
	},
	// 接受父组件传递颜色
	color: {
		type: String,
		default: "",
	},
	// 接受父组件传递过来的图标的宽度
	width: {
		type: String,
		default: "",
	},
	// 接受父组件传递过来的图标的高度
	height: {
		type: String,
		default: "",
	},
	// 统一设置 size（优先级高于 width 和 height）
	size: {
		type: String,
		default: "",
	},
	padding: {
		type: String,
		default: "10px",
	},
});
</script>
