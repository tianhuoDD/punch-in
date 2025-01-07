<template>
	<div class="clock-in-list-container">
		<!-- 打卡记录列表 -->
		<div>
			<PunchBlock v-for="(record, index) in records" :key="index" :title="record.title" :day="record.day" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PunchBlock from "@/components/punch-in/PunchBlock.vue";
import { useNavbarStore } from "@/stores/counter"; // 引入 Pinia store
import { getPunchRecordsApi } from "@/apis/punch-in";

// 获取导航栏 store 实例
const navbarStore = useNavbarStore();
// 设置左侧按钮显示为 false，右侧按钮显示为 true
navbarStore.toggleLeftButton(false);
navbarStore.toggleRightButton(true);

// 定义响应式变量
const records = ref([]); // 存储打卡记录
const isLoading = ref(false); // 加载状态

// 获取打卡记录的函数
const fetchClockIns = async () => {
	isLoading.value = true;
	try {
		const data = await getPunchRecordsApi();
		records.value = processRecords(data);
		console.log(records.value);
	} catch {
		records.value = [];
	} finally {
		isLoading.value = false;
	}
};
/**
 * 处理打卡记录，计算每条记录的坚持天数并添加到记录中
 * @param {Array} data - 从后端获取的打卡记录数组
 * @returns {Array} - 处理后的打卡记录数组
 */
function processRecords(data) {
	return data.map((record) => {
		const createdAt = new Date(record.created_at); // 记录创建时间
		let day = 0;

		if (record.punch_times && record.punch_times.length > 0) {
			const lastPunchTimeStr = record.punch_times[record.punch_times.length - 1];
			const lastPunchTime = new Date(lastPunchTimeStr); // 最后一次打卡时间

			// 计算时间差（以毫秒为单位）
			const diffTime = lastPunchTime - createdAt;

			// 计算相差的天数
			day = Math.floor(diffTime / (1000 * 60 * 60 * 24));
		}

		return { ...record, day };
	});
}
// 在组件挂载时获取初始数据
onMounted(() => {
	fetchClockIns();
});
</script>

<style scoped>
.clock-in-list-container {
	padding: 16px;
}

.pagination {
	margin: 20px 0;
	display: flex;
	justify-content: center;
}
</style>
