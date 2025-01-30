<template>
	<div class="index-wrapper">
		<van-nav-bar :border="false" />
		<van-empty :image="index_empty" image-size="300" class="index-wrapper-empty">
			<template #description>
				<van-space direction="vertical" align="center">
					<span class="empty-title">Hi, 用户</span>
					<span>创建你的第一笔记账吧</span>
				</van-space>
			</template>
		</van-empty>
		<div class="bottom-arrow">
			<van-image width="20" :src="bottom_arrow" />
		</div>
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
import index_empty from "@/assets/images/index_empty.png";
import bottom_arrow from "@/assets/images/bottom_arrow.png";
const router = useRouter();
</script>
<style scoped>
.index-wrapper {
	display: flex;
	flex-direction: column;
	height: 100%;
}
.index-wrapper-empty {
	flex-grow: 0.6;
}
.index-wrapper-empty :deep(.van-empty__image) {
	margin-bottom: 100px;
}
.index-wrapper-empty :deep(.van-empty__description) {
	margin-top: 0;
}
.index-wrapper .van-empty {
	padding-bottom: 0;
}
.empty-title {
	font-size: 22px;
	color: var(--font-black-color);
}
.bottom-arrow {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
