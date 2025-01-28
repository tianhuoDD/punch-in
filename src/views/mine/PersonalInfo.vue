<template>
	<div class="personal-container">
		<van-nav-bar title="我的个人资料" left-text="我的" left-arrow @click-left="onClickLeft" />
		<van-cell class="space" :border="false" />
		<van-cell class="avatar">
			<template #title>
				<van-image
					width="80"
					height="80"
					fit="cover"
					position="center"
					src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
				/>
			</template>
		</van-cell>
		<van-cell class="space" :border="false" />
		<!-- 可修改的内容 -->
		<van-cell is-link>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">昵称</span>
					<span class="cell-content">Romcere</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell is-link>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">邮箱</span>
					<span class="cell-content">2434260208@qq.com</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell class="space" :border="false" />
		<!-- 仅展示，不可修改的内容 -->
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">用户名</span>
					<span class="cell-content">2</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">创建时间</span>
					<span class="cell-content">2</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell>
			<template #title>
				<van-space size="20px">
					<span class="cell-title">PunchIn ID</span>
					<span class="cell-content">2</span>
				</van-space>
			</template>
		</van-cell>
		<van-cell class="fill-space space" :border="false" />
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const onClickLeft = () => {
	router.back();
};
</script>
<style scoped>
.personal-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.avatar {
	padding: 20px 0;
	background-color: var(--bg-gray-color);
}
.avatar :deep(.van-cell__title) {
	display: flex;
	justify-content: center;
	align-items: center;
}
.fill-space {
	flex-grow: 1;
}
.space {
	background-color: var(--bg-black-color);
}
.cell-title {
	color: var(--font-gray-color);
	font-size: 16px;
}
.cell-content {
	font-size: 16px;
}
</style>
