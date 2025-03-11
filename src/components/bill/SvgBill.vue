<template>
	<van-grid :column-num="5" :border="false">
		<van-grid-item v-for="(icon, index) in iconList" :key="index" @click="copyIconName(icon)">
			<SvgIcon :name="icon" class="icon-preview" padding="0px" width="40px" height="40px" />
			<p class="icon-name">图标</p>
		</van-grid-item>
	</van-grid>
</template>

<script setup>
import { ref } from "vue";
import SvgIcon from "../SvgIcon.vue";
import { showToast } from "vant";

/**
 * 动态加载 @/assets/icons/bill-icons 目录下的所有 SVG 文件
 */
const icons = import.meta.glob("@/assets/icons/bill-icons/*.svg");

// 获取文件名并去掉路径和后缀
const iconList = ref(Object.keys(icons).map((path) => path.split("/").pop().replace(".svg", "")));

/**
 * 复制 SVG 名称到剪贴板
 * @param {string} iconName - 要复制的 SVG 文件名
 */
const copyIconName = (iconName) => {
	navigator.clipboard.writeText(iconName).then(() => {
		showToast(`已复制: ${iconName}`);
	});
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
