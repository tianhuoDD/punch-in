<template>
	<van-nav-bar
		title="添加类别"
		left-text="编辑分类"
		right-text="确定"
		left-arrow
		@click-left="onClickLeft"
		@click-right="onClickRight"
	/>
	<input-svg v-model="categoryModel" :svg-name="iconName" :maxlength="4" />
	<svg-bill
		class="svg-bill"
		:svg-list="svgList"
		:show-edit="false"
		:show-category="false"
		@icon-click="handleIconClick"
	/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import InputSvg from "@/components/bill/InputSvg.vue";
import SvgBill from "@/components/bill/SvgBill.vue";
import { getSVGApi, postUserSVGApi } from "@/apis/svg";

const categoryModel = ref("");
const iconName = ref("");
const category = ref("");
const svgList = ref([]);

// 导航栏按钮点击事件
const onClickLeft = () => history.back();

const onClickRight = async () => {
	try {
		await postUserSVGApi({
			svg_name: iconName.value,
			category: categoryModel.value,
		});
		history.back();
	} catch (error) {
		console.error("添加失败:", error);
	}
};

// 获取SVG数据
const getSVG = async () => {
	try {
		const data = await getSVGApi();
		svgList.value = data.data;
		// 初始化为第一个图标和分类
		if (svgList.value.length > 0) {
			iconName.value = svgList.value[0].svg_name;
			category.value = svgList.value[0].category;
		}
	} catch (error) {
		console.error("获取SVG失败:", error);
	}
};

// 监听图标点击事件
const handleIconClick = (icon) => {
	iconName.value = icon.name;
};

// 组件挂载时获取数据
onMounted(() => {
	getSVG();
});
</script>
