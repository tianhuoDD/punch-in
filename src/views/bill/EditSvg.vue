<template>
	<van-nav-bar
		title="编辑分类"
		left-text="返回"
		right-text="添加"
		left-arrow
		@click-left="onClickLeft"
		@click-right="onClickRight"
	/>
	<!-- 遍历 categoryList 生成单元格 -->
	<van-cell v-for="(icon, index) in svgList" :key="index" is-link class="edit-svg-cell">
		<template #title>
			<p>{{ icon.category }}</p>
		</template>
		<!-- 使用 icon 插槽渲染 SVG 图标 -->
		<template #icon>
			<SvgIcon :name="icon.svg_name" padding="0px" width="30px" height="30px" />
		</template>
	</van-cell>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { getUserSVGApi } from "@/apis/svg";

const router = useRouter();
// 导航栏按钮点击事件
const onClickLeft = () => history.back();
const onClickRight = () => router.push({ name: "add-svg" });

// 定义响应式数据
const svgList = ref([]);

// 获取 SVG 图标数据
const getUserSvg = async () => {
	try {
		const data = await getUserSVGApi();
		svgList.value = data.data; // 直接赋值分类列表
	} catch (error) {
		console.error("获取SVG失败:", error);
	}
};

onMounted(async () => {
	await getUserSvg();
});
</script>
<style scoped>
.edit-svg-cell :deep(.van-cell__title) {
	display: flex;
	align-items: center;
	padding-left: 5px;
}
</style>
