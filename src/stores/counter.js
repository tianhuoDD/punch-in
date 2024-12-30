import { ref, computed } from "vue";
import { defineStore } from "pinia";
// 定义 侧边栏自定义 仓库
export const useNavbarStore = defineStore("navbarCustom", () => {
	// 定义状态
	const leftButtonVisible = ref(false); // 左边按钮的可见性，布尔值
	const rightButtonVisible = ref(false); // 右边按钮的可见性，布尔值
	const title = ref("");
	// 定义 actions
	const toggleLeftButton = (visible) => {
		leftButtonVisible.value = visible;
	};

	const toggleRightButton = (visible) => {
		rightButtonVisible.value = visible;
	};

	const setTitle = (newTitle) => {
		title.value = newTitle;
	};

	// 返回状态和 actions
	return {
		leftButtonVisible,
		rightButtonVisible,
		title,
		toggleLeftButton,
		toggleRightButton,
		setTitle,
	};
});
