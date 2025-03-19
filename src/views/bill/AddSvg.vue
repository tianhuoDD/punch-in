<template>
	<van-nav-bar
		:title="pageTitle"
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
import { useRoute, useRouter } from "vue-router";
import InputSvg from "@/components/bill/InputSvg.vue";
import SvgBill from "@/components/bill/SvgBill.vue";
import { useTransactionStore } from "@/stores/transactionStores";
import { getSVGApi, postUserSVGApi, updateUserSVGApi } from "@/apis/svg";
import { showToast } from "vant";
const transactionStore = useTransactionStore();
const route = useRoute();
const router = useRouter();

const categoryModel = ref("");
const svgList = computed(() => transactionStore.allSvgList || []);
// 动态修改页面标题
const pageTitle = computed(() => (route.query.svg_id ? "编辑类别" : "添加类别"));
// 计算属性 - 图标名称
const selectedIcon = ref(null);
const iconName = computed({
	get: () => selectedIcon.value?.svg_name || transactionStore.allSvgList?.[0]?.svg_name,
	set: (value) => {
		if (selectedIcon.value) {
			selectedIcon.value.svg_name = value;
		} else {
			selectedIcon.value = { svg_name: value };
		}
	},
});

// 组件挂载时获取数据
onMounted(() => {
	fetchUserSvg();
	handleRouteParams();
});
// 获取SVG数据
const fetchUserSvg = async () => {
	try {
		const { data } = await getSVGApi();
		transactionStore.allSvgList = data;
	} catch (error) {
		console.error("获取SVG失败:", error);
	}
};
// 处理路由传参
const handleRouteParams = () => {
	const { svg_name, category } = route.query;
	if (svg_name) {
		selectedIcon.value = { svg_name };
	}
	if (category) {
		categoryModel.value = category;
	}
};
// 导航栏按钮点击事件
const goBack = () => router.push({ name: "edit-svg" });
// 添加/编辑svg
const handleAddSvg = async () => {
	try {
		if (!categoryModel.value) {
			showToast("分类名称不能为空");
			return;
		}
		if (route.query.svg_id) {
			// 编辑模式，调用更新 API
			const { message } = await updateUserSVGApi(route.query.svg_id, {
				svg_name: iconName.value,
				category: categoryModel.value,
			});
			showToast(message || "更新成功");
		} else {
			// 添加模式，调用新增 API
			const { message } = await postUserSVGApi({
				svg_name: iconName.value,
				category: categoryModel.value,
			});
			showToast(message || "添加成功");
		}
		history.back();
	} catch (errMsg) {
		showToast(errMsg);
	}
};
// 监听图标点击事件
const handleIconClick = (icon) => {
	iconName.value = icon.name;
};
</script>
