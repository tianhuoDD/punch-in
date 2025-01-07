<template>
	<div class="app-container">
		<!-- 顶部导航栏 -->
		<van-nav-bar class="top-nav" style="background-color: #f5f5f5">
			<!-- 动态设置标题 -->
			<template #title>
				<span>{{ navbarStore.title || "PunchIn-打卡" }}</span>
			</template>

			<!-- 动态设置左侧按钮是否可见 -->
			<template v-if="navbarStore.leftButtonVisible" #left>
				<van-icon name="arrow-left" @click="goBack" />
			</template>

			<!-- 动态设置右侧按钮是否可见 -->
			<template v-if="navbarStore.rightButtonVisible" #right>
				<van-icon name="setting-o" @click="toggleActionSheet" />
			</template>
		</van-nav-bar>
		<!-- 下拉菜单 - action sheet -->
		<van-action-sheet
			v-model:show="showActionSheet"
			:actions="actions"
			close-on-click-action
			cancel-text="取消"
			@select="onSelectAction"
		/>
		<!-- 实际页面内容 -->
		<div>
			<!-- 实际页面内容 -->
			<router-view />
		</div>
		<!-- 底部导航栏 -->
		<van-tabbar v-model="active" route class="bottom-tabbar">
			<van-tabbar-item replace to="/punch-in" icon="home-o" style="background-color: #f5f5f5 !important"
				>打卡</van-tabbar-item
			>
			<van-tabbar-item replace to="/record-bills" icon="label-o" style="background-color: #f5f5f5 !important"
				>记账</van-tabbar-item
			>
		</van-tabbar>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNavbarStore } from "@/stores/counter"; // 引入自定义导航栏 store
import { showToast } from "vant";
// 获取 router 实例
const router = useRouter();

// 获取导航栏 store 实例
const navbarStore = useNavbarStore();
const active = ref(0);

// 处理左侧按钮点击事件
const goBack = () => {
	showToast("返回");
	router.push("/punch-in");
	// 设置左侧按钮显示为 false
	navbarStore.toggleLeftButton(false);
};
// 处理右侧按钮点击事件
// 控制 Action Sheet 是否显示
const showActionSheet = ref(false);
// 定义下拉框中的选项
const actions = ref([
	{ name: "新增", color: "#07c160" }, // 绿色字体的新增选项
]);
// 点击右侧按钮时，显示 Action Sheet
const toggleActionSheet = () => {
	showActionSheet.value = true;
};
// 处理 Action Sheet 的选项选择
const onSelectAction = (action) => {
	if (action.name === "新增") {
		// 处理“新增”选项的逻辑
		showToast("点击了新增");
		router.push("/punch-add");
	} else {
		console.log(`选择了 ${action.name}`);
	}
};
</script>

<style scoped>
.van-nav-bar {
	border-bottom: 1px solid #81818643;
}

.van-tabbar {
	border-top: 1px solid #81818643;
}
.app-container {
	display: flex;
	flex-direction: column;
	height: 100vh; /* 使容器高度占满视口 */
}
.top-nav {
	flex: 0 0 auto; /* 固定高度 */
}
</style>
