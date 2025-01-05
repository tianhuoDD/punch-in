<template>
	<div class="add-clock-in-container">
		<!-- 打卡任务内容编辑 -->
		<van-cell-group>
			<van-uploader v-model="fileList" reupload max-count="1" />
			<van-field v-model="title" label="打卡标题：" placeholder="请输入打卡标题" required :rules="titleRules" />
			<van-field
				v-model="clockInContent"
				label="打卡内容："
				placeholder="请输入打卡内容"
				required
				:rules="contentRules"
				type="textarea"
				rows="3"
			/>
		</van-cell-group>

		<!-- 添加新任务按钮 -->
		<van-button round block type="success" :loading="isLoading" :disabled="isLoading" @click="addClockIn">
			{{ isLoading ? "正在添加..." : "添加打卡项" }}
		</van-button>
	</div>
</template>

<script setup>
import { showToast } from "vant";
import { ref } from "vue";
import { useNavbarStore } from "@/stores/counter"; // 引入 Pinia
import router from "@/router";
import { postClockInApi } from "@/apis/punch-in";
// 获取导航栏 store 实例
const navbarStore = useNavbarStore();
// 设置导航栏按钮显示状态
navbarStore.toggleLeftButton(true);
navbarStore.toggleRightButton(false);

// 定义表单字段
const title = ref("");
const clockInContent = ref("");
const fileList = ref([]);
// 定义表单验证规则
const titleRules = [
	{ required: true, message: "请输入打卡标题", trigger: "blur" },
	{ min: 1, max: 50, message: "标题长度应在1-50个字符之间", trigger: "blur" },
];
const contentRules = [
	{ required: true, message: "请输入打卡内容", trigger: "blur" },
	{ min: 1, max: 500, message: "内容长度应在1-500个字符之间", trigger: "blur" },
];

// 定义加载状态
const isLoading = ref(false);

// 添加打卡内容
const addClockIn = async () => {
	// 简单前端验证
	if (title.value.trim() === "") {
		showToast("请输入打卡标题");
		return;
	}
	if (clockInContent.value.trim() === "") {
		showToast("请输入打卡内容");
		return;
	}
	// 开始加载
	isLoading.value = true;
	try {
		// 获取图片文件，如果有的话
		const img = fileList.value.length > 0 ? fileList.value[0] : null;
		// 发送请求到后端存储打卡内容
		const response = await postClockInApi({
			title: title.value.trim(),
			content: clockInContent.value.trim(),
			img: img,
		});
		if (response.code === 201) {
			// 确认后端返回的是201
			showToast("打卡成功");
			// 清空输入框
			title.value = "";
			clockInContent.value = "";
			// 导航到打卡列表页面，并替换当前历史记录
			router.replace("/PunchIn");
		} else {
			showToast(`添加失败: ${response.message}`);
		}
	} catch (error) {
		console.error("添加打卡项失败:", error);
		showToast("添加失败，请稍后重试");
	} finally {
		// 结束加载
		isLoading.value = false;
	}
};
</script>

<style scoped>
.add-clock-in-container {
	padding: 16px;
}

.van-cell-group {
	margin-top: 10px;
}

.van-field {
	margin-bottom: 20px;
}

.van-button {
	width: 100%;
	max-width: 300px;
	margin: 20px auto 0;
}
</style>
