<template>
	<van-card class="punch-card">
		<template #desc>
			<van-row class="card-row">
				<van-col span="16">
					<svg-icon name="test" />
					<span class="title">{{ title }}</span>
				</van-col>
				<van-col span="4" class="vertical">
					<span class="day-title">{{ day + 1 }} 天</span>
					<span> 共计坚持 </span>
				</van-col>
				<van-col span="4" class="vertical">
					<svg-icon name="PunchBtn" color="green" />
				</van-col>
			</van-row>
		</template>
	</van-card>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
// 定义组件接收的props
defineProps({
	svg: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
		default: "打卡标题",
	},
	day: {
		type: Number,
		required: true,
		default: 1,
	},
});
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
/* 卡片背景颜色 */
.card-row {
	background-color: #e17e55;
	border: 1.5px solid black;
	border-radius: 5px;
}
/* 标题文字 */
.title {
	font-size: 16px;
	font-weight: bold;
}
.day-title {
	font-size: 18px;
	font-weight: bold;
	white-space: nowrap; /* 防止换行 */
	overflow: hidden; /* 隐藏溢出部分 */
	text-overflow: ellipsis; /* 显示省略号 */
}
/* 新增垂直排列的样式 */
.vertical {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
