<template>
	<svg aria-hidden="true" :style="{ width, height, padding }">
		<use :href="`#${prefix}-${name}`" :fill="color" />
	</svg>
</template>
<script setup>
defineProps({
	prefix: {
		type: String,
		default: "icon",
	},
	name: {
		type: String,
		required: true,
	},
	//接受父组件传递颜色
	color: {
		type: String,
		default: "",
	},
	//接受父组件传递过来的图标的宽度
	width: {
		type: String,
		default: "30px",
	},
	//接受父组件传递过来的图标的高度
	height: {
		type: String,
		default: "30px",
	},
	padding: {
		type: String,
		default: "10px",
	},
});
</script>
