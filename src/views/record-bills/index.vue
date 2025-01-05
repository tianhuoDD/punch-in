<template>
	<span>记账</span>
</template>
<script setup>
import { useNavbarStore } from "@/stores/counter"; // 引入 Pinia
// 获取导航栏 store 实例
const navbarStore = useNavbarStore();
// 设置左侧按钮显示为 true
navbarStore.toggleLeftButton(false);
// 设置左侧按钮显示为 true
navbarStore.toggleRightButton(true);
</script>
