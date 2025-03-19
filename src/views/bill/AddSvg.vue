<template>
	<van-nav-bar
		title="添加类别"
		left-text="编辑分类"
		right-text="确定"
		left-arrow
		@click-left="goBack"
		@click-right="handleAddSvg"
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
import { ref, onMounted, computed } from "vue";
import InputSvg from "@/components/bill/InputSvg.vue";
import SvgBill from "@/components/bill/SvgBill.vue";
import { useTransactionStore } from "@/stores/transactionStores";
import { getSVGApi, postUserSVGApi } from "@/apis/svg";
const transactionStore = useTransactionStore();

const categoryModel = ref("");
const svgList = computed(() => transactionStore.allSvgList || []);
const iconName = ref(svgList.value[0]?.svg_name);
const category = ref(svgList.value[0]?.category);
// 组件挂载时获取数据
onMounted(() => {
	fetchUserSvg();
});
// 获取SVG数据
const fetchUserSvg = async () => {
	try {
		const { data } = await getSVGApi();
		transactionStore.allSvgList = data;
		// 初始化为第一个图标和分类
		if (svgList.value.length > 0) {
			iconName.value = svgList.value[0].svg_name;
			category.value = svgList.value[0].category;
		}
	} catch (error) {
		console.error("获取SVG失败:", error);
	}
};
// 导航栏按钮点击事件
const goBack = () => history.back();
// 添加svg
const handleAddSvg = async () => {
	try {
		const { message } = await postUserSVGApi({
			svg_name: iconName.value,
			category: categoryModel.value,
		});
		showToast(message);
		history.back();
	} catch (error) {
		console.error("添加失败:", error);
	}
};
// 监听图标点击事件
const handleIconClick = (icon) => {
	iconName.value = icon.name;
};
</script>
