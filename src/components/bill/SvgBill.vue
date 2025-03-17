<template>
	<van-grid class="svg-bill" :column-num="5" :border="false">
		<!-- 动态渲染图标 -->
		<van-grid-item v-for="(icon, index) in svgList" :key="index" @click="handleIconClick(icon)">
			<SvgIcon :name="icon.svg_name" class="icon-preview" padding="0px" width="40px" height="40px" />
			<!-- 根据 showCategory 控制分类显示 -->
			<p v-if="showCategory" class="icon-name">{{ icon.category }}</p>
		</van-grid-item>

		<!-- 可控制的编辑按钮 -->
		<van-grid-item v-if="showEdit" key="edit" @click="handleEditClick">
			<SvgIcon name="edit" class="icon-preview" padding="0px" width="40px" height="40px" />
			<p class="icon-name">编辑</p>
		</van-grid-item>
	</van-grid>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import SvgIcon from "../SvgIcon.vue";

// 定义可控属性
const props = defineProps({
	svgList: {
		type: Array,
		default: () => [],
	},
	showEdit: {
		// 控制是否显示“编辑”按钮
		type: Boolean,
		default: true,
	},
	showCategory: {
		// 控制是否显示图标分类
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["icon-click", "edit-click"]);

// 监听 `van-grid-item` 的点击事件
const handleIconClick = (icon) => {
	emit("icon-click", { name: icon.svg_name, category: icon.category });
};
const handleEditClick = () => {
	emit("edit-click");
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

.svg-bill :deep(.van-grid-item__content--center) {
	padding: 10px 0px;
	max-height: 100px;
}
</style>
