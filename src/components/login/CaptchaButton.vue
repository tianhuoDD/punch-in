<template>
	<div class="captcha-button">
		<van-button v-if="!isSending && !isCountingDown" type="primary" size="small" @click="sendCaptcha">
			获取验证码
		</van-button>
		<van-button v-if="isSending" type="primary" size="small" loading loading-text="发送中..." disabled>
			获取验证码
		</van-button>
		<van-button v-if="isCountingDown" type="primary" size="small" disabled>
			<van-count-down
				ref="countDown"
				millisecond
				:time="countDownTime"
				:auto-start="true"
				format="ss"
				@finish="handleFinish"
			/>
			重新发送
		</van-button>
	</div>
</template>

<script setup>
import { ref } from "vue";

// 定义状态
const isSending = ref(false); // 是否正在发送验证码
const isCountingDown = ref(false); // 是否正在倒计时
const countDownTime = ref(60000); // 倒计时时间，单位为毫秒

const emits = defineEmits(["sendCaptcha"]);
// 发送验证码
const sendCaptcha = () => {
	// 设置发送状态
	isSending.value = true;
	// 触发父组件的事件，并传入回调函数
	emits("sendCaptcha", (status) => {
		if (status === "success") {
			// 回调函数在父组件操作完成后执行
			isSending.value = false;
			isCountingDown.value = true;
		} else if (status === "fail") {
			// 如果发送失败，停止发送状态并提示错误
			isSending.value = false;
			isCountingDown.value = false;
		}
	});
};
// 倒计时结束时调用
const handleFinish = () => {
	// 倒计时结束，恢复按钮状态
	isCountingDown.value = false;
};
</script>

<style scoped>
.captcha-button :deep(.van-button__text) {
	display: flex;
	align-items: center;
}
.van-count-down {
	color: var(--login-white-color);
	margin-right: 5px;
}
</style>
