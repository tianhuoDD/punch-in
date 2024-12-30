<template>
	<van-card :thumb="thumb">
		<!-- 自定义描述内容和右侧图标 -->
		<template #desc>
			<div class="card-desc">
				<div class="card-title">{{ title }}</div>
				<div class="desc-content">
					<span class="description-text">{{ description }}</span>
					<van-icon
						name="success"
						:color="iconColor"
						class="check-icon"
						aria-label="Toggle Check Status"
						@click="toggleCheck"
					/>
				</div>
				<div class="time-text">{{ createdAt }}</div>
			</div>
		</template>
	</van-card>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

// 定义组件接收的props
const props = defineProps({
	thumb: {
		type: String,
		required: false,
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
.card-desc {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.card-title {
	font-size: 16px;
	font-weight: bold;
}

.desc-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.description-text {
	flex: 1;
	word-break: break-word;
	white-space: normal;
	margin-right: 8px;
	font-size: 14px;
	color: #555;
}

.check-icon {
	font-size: 24px;
	cursor: pointer;
}

.time-text {
	font-size: 12px;
	color: #999;
}
</style>
