<template>
	<van-grid :column-num="5" :border="false">
		<van-grid-item v-for="(icon, index) in iconList" :key="index" @click="handleIconClick(icon)">
			<SvgIcon :name="icon" class="icon-preview" padding="0px" width="40px" height="40px" />
			<p class="icon-name">图标</p>
		</van-grid-item>
	</van-grid>
</template>

<script setup>
import { ref } from "vue";
import SvgIcon from "../SvgIcon.vue";

/**
 * 动态加载 @/assets/icons/bill-icons 目录下的所有 SVG 文件
 */
const icons = import.meta.glob("@/assets/icons/bill-icons/*.svg");

// 获取文件名并去掉路径和后缀
const iconList = ref(Object.keys(icons).map((path) => path.split("/").pop().replace(".svg", "")));

const props = defineProps({
	svgList: {
		type: Array,
		default: () => [],
	},
	categoryList: {
		type: Array,
		default: () => [],
	},
});
const emit = defineEmits("icon-click");
// 监听 `van-grid-item` 的点击事件
const handleIconClick = (iconName) => {
	emit("icon-click", iconName);
};
</script>

<style scoped>
.icon-preview {
	margin-bottom: 5px;
}

.icon-name {
	font-size: 16px;
	color: #666;
}
.van-grid :deep(.van-grid-item__content--center) {
	padding: 10px 0px;
}
</style>
