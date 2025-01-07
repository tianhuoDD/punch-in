<template>
	<div class="my-page">
		<!-- 顶部用户信息 -->
		<div class="user-info">
			<van-image round :width="80" :height="80" src="https://via.placeholder.com/80" class="avatar" />
			<div class="username">{{ username }}</div>
		</div>

		<!-- 菜单列表 -->
		<van-cell-group>
			<van-cell
				v-for="item in menuItems"
				:key="item.name"
				:title="item.name"
				:is-link="true"
				style="display: flex; align-items: center"
				@click="handleMenuClick(item)"
			>
				<template #icon>
					<van-icon :name="item.icon" style="margin-right: 5px" />
				</template>
			</van-cell>
		</van-cell-group>

		<!-- 退出登录按钮 -->
		<van-button type="danger" block round class="logout-button" @click="handleLogout"> 退出登录 </van-button>
	</div>
</template>

<script setup>
import { ref } from "vue";

// 用户名（可从 Vuex、Pinia 或 API 获取）
const username = ref("用户名"); // 示例数据，可替换为实际逻辑

// 菜单项
const menuItems = ref([
	{ name: "我的收藏", icon: "star-o", action: "favorites" },
	{ name: "设置", icon: "setting-o", action: "settings" },
	{ name: "帮助中心", icon: "question-o", action: "help" },
]);

// 菜单点击处理
const handleMenuClick = (item) => {
	switch (item.action) {
		case "favorites":
			console.log("跳转到我的收藏页面");
			// 路由跳转示例
			// router.push('/favorites');
			break;
		case "settings":
			console.log("跳转到设置页面");
			break;
		case "help":
			console.log("跳转到帮助中心");
			break;
		default:
			console.log("未知操作");
	}
};

// 退出登录处理
const handleLogout = () => {
	console.log("退出登录");
	// 实现退出登录逻辑，例如清除 Token、重定向到登录页等
	// router.push('/login');
};
</script>

<style scoped>
.my-page {
	padding: 16px;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.user-info {
	text-align: center;
	margin-bottom: 24px;
}

.avatar {
	margin-bottom: 8px;
}

.username {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.logout-button {
	margin-top: 16px;
}
</style>
