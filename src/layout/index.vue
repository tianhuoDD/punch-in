<template>
	<router-view />
	<van-tabbar v-model="active" route>
		<van-tabbar-item name="balance">
			<template #icon>
				<bank-card theme="outline" size="22" :stroke-width="3" />
			</template>
			记账
		</van-tabbar-item>
		<van-tabbar-item name="report">
			<template #icon>
				<analysis theme="outline" size="22" :stroke-width="3" />
			</template>
			报表
		</van-tabbar-item>
		<!-- 添加图标 -->
		<van-tabbar-item name="add" to="/index">
			<svg-icon name="add" width="50px" height="50px" padding="0" class="add-icon" @click="handleAddClick" />
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
import SvgIcon from "@/components/SvgIcon.vue";
import { BankCard, Analysis, User, Comment } from "@icon-park/vue-next";
const active = ref("add");

const handleAddClick = () => {};
</script>
<style scoped>
.add-icon {
	cursor: pointer;
}
</style>
