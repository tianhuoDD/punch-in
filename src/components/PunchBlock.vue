<template>
	<van-card class="punch-card">
		<template #desc>
			<van-row class="card-row">
				<van-col span="22" class="card-col">
					<img :src="test" style="width: 30px; height: 30px" />
					{{ title }}
				</van-col>
				<van-col span="2"> {{ description }} </van-col>
			</van-row>
		</template>
	</van-card>
</template>

<script setup>
import { ref, computed } from "vue";
import test from "@/assets/icons/test.svg";
// 定义组件接收的props
defineProps({
	thumb: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		required: true,
	},
});

// 定义事件
const emit = defineEmits(["update:checked"]);

// 定义是否已打卡的状态
const isChecked = ref(false);

// 计算图标颜色
const iconColor = computed(() => (isChecked.value ? "green" : "gray"));

// 切换打卡状态并通知父组件
const toggleCheck = () => {
	isChecked.value = !isChecked.value;
	emit("update:checked", isChecked.value);
};
</script>

<style scoped>
.punch-card {
	max-height: 60px;
	padding: 0;
}
.punch-card :deep(.van-card__header),
.punch-card :deep(.van-card__content) {
	min-height: 60px !important;
}
.punch-card :deep(.van-card__content) div {
	height: 100%;
}
.punch-card .van-col {
	align-items: center;
	display: flex;
}
.check-icon {
	font-size: 24px;
	cursor: pointer;
}
</style>
