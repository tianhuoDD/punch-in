<template>
	<router-view />
	<van-tabbar v-model="activeModel" route>
		<van-tabbar-item name="balance">
			<template #icon>
				<bank-card theme="outline" size="22" :stroke-width="3" />
			</template>
			资产
		</van-tabbar-item>
		<van-tabbar-item name="report">
			<template #icon>
				<analysis theme="outline" size="22" :stroke-width="3" />
			</template>
			报表
		</van-tabbar-item>
		<!-- 添加图标 -->
		<van-tabbar-item name="add" to="/index">
			<!-- 账单图标显示 -->
			<template v-if="route.name !== 'bill' && route.name !== 'index' && 'index'" #icon>
				<comment theme="outline" size="22" :stroke-width="3" />
			</template>
			<span v-if="route.name !== 'bill' && route.name !== 'index'">账单</span>
			<!-- 添加图标显示 -->
			<svg-icon
				v-else
				name="add"
				width="50px"
				height="50px"
				padding="0"
				class="add-icon"
				@click.stop="handleAddClick"
			/>
		</van-tabbar-item>
		<van-tabbar-item name="community">
			<template #icon>
				<comment theme="outline" size="22" :stroke-width="3" />
			</template>
			社区
		</van-tabbar-item>
		<van-tabbar-item name="mine" to="/mine">
			<template #icon>
				<user theme="outline" size="22" :stroke-width="3" />
			</template>
			我的
		</van-tabbar-item>
	</van-tabbar>
</template>
<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";
import { BankCard, Analysis, User, Comment } from "@icon-park/vue-next";
const route = useRoute();
const router = useRouter();

const activeModel = ref("add");

const handleAddClick = () => {
	router.push({ name: "add-bill" });
};
</script>
<style scoped>
.add-icon {
	cursor: pointer;
}
</style>
