<template>
	<div class="not-found">
		<van-watermark content="PunchIn" opacity="0.5" z-index="0" />
		<van-image class="not-found-img" src="https://romcere.top/upload/f7ea0c99-39b3-4cfd-ba29-89edcd7a058e.png" />
		<h1>404 - 页面未找到</h1>
		<p>你访问了一个正常情况下无法被打开的页面。</p>
		<p>
			如果你需要解析APP源码，欢迎
			<span style="color: var(--font-blue-color); font-size: 16px">访问我的博客或GitHub主页</span>
			来查看。
		</p>
		<van-space style="margin-top: 20px">
			<van-button plain hairline round type="success" @click="openBlog">访问Romcere's Blog</van-button>
			<van-button plain hairline round type="success" @click="openGithub">访问Romcere's GitHub</van-button>
		</van-space>
		<van-button plain hairline type="primary" style="margin-top: 30px" @click="goHome()">返回首页</van-button>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
	router.push({ name: "index" });
};
const openBlog = () => {
	window.open("https://romcere.top", "_blank");
};
const openGithub = () => {
	window.open("https://github.com/tianhuoDD", "_blank");
};
</script>

<style scoped>
.not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
}
.not-found-img {
	width: 150px;
	height: 150px;
	margin-bottom: 20px;
}
h1 {
	font-size: 24px;
	margin-bottom: 10px;
}
p {
	font-size: 16px;
	color: #666;
	margin-bottom: 5px;
}
</style>
