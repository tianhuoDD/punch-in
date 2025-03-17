<template>
	<van-field placeholder="自定义输入名称" class="input-svg">
		<template #left-icon>
			<svg-icon :name="svgName" padding="0px" width="40px" height="40px" />
		</template>
	</van-field>
</template>
<script setup>
import SvgIcon from "../SvgIcon.vue";

defineProps({
	svgName: {
		type: String,
		default: "",
	},
});
</script>
<style scoped>
.input-svg :deep(.van-field__left-icon) {
	display: flex;
	align-items: center;
}
.input-svg :deep(.van-cell__value) {
	display: flex;
	align-items: center;
}
.input-svg :deep(.van-field__body) {
	font-size: 18px;
}
</style>
