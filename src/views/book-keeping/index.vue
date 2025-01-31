<template>
	<div class="book-keeping">
		<van-nav-bar title="默认账本" />
		<van-steps direction="vertical" :active="0" class="book-keeping-steps">
			<van-step>月预算</van-step>
			<van-step class="step-date">
				<template #inactive-icon>
					<i class="date-bg"></i>
					<span class="date-text">今日</span>
				</template>
				<span class="title">支出 9.0</span>
			</van-step>
			<van-step>
				<template #inactive-icon>
					<svg-icon name="smile" padding="0" width="30px" height="30px" color="var(--font-black-color)" />
				</template>
			</van-step>
		</van-steps>
	</div>
</template>
<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
</script>
<style scoped>
.book-keeping {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.book-keeping-steps {
	flex: 1;
}
.book-keeping :deep(.van-hairline) {
	padding-left: 10px;
}
/* 步骤条统一样式 */
.book-keeping .van-hairline {
	padding-bottom: 50px; /* 线条长度 */
	margin-bottom: 25px;
}
.book-keeping :deep(.van-step__line) {
	background-color: var(--line-gray-color);
	top: auto;
}
/* 当日记账提示样式 */
.step-date {
	position: relative; /* 让子元素相对于 van-step 进行定位 */
}
.step-date .date-bg {
	width: 30px;
	height: 30px;
	background-color: var(--bg-gray2-color);
	border-radius: 50%;
	display: block;
}
.step-date .date-text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: var(--font-white-color);
	font-size: 12px;
	white-space: nowrap;
}
/* 每个 step右侧描述 的样式 */
.book-keeping :deep(.van-step--vertical:not(:last-child):after) {
	border: 0;
}
.book-keeping .title {
	font-size: 16px;
}
</style>
