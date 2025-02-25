<template>
	<van-tabs v-model:active="active" class="add-bill" type="card" animated swipeable>
		<van-tab name="income" title="收入">收入</van-tab>
		<van-tab name="expense" title="支出">
			<input-bill v-model="amountValue" />
		</van-tab>
		<van-tab name="transfer" title="转账">转账</van-tab>
	</van-tabs>
	<van-number-keyboard v-model="amountValue" :show="true" theme="custom" extra-key="." close-button-text="确定" />
</template>
<script setup>
import { ref } from "vue";
import InputBill from "@/components/InputBill.vue";
const amountValue = ref("0.00");
const active = ref("expense");
</script>
<style scoped>
/* 顶部tabs选项卡样式 */
.add-bill {
	height: 100%;
	padding-top: 10px;
	padding-bottom: 10px;
}
.add-bill :deep(.van-tabs__content) {
	height: 100%;
}
.add-bill :deep(.van-tabs__wrap) {
	padding-left: 50px;
	padding-right: 50px;
}
.add-bill :deep(.van-tabs__nav--card) {
	border-radius: 5px;
}
</style>
