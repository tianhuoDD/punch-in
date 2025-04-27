<!-- SecurityCode组件 -->
<template>
	<canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
</template>
<script setup>
import { watch, onMounted } from "vue";
const props = defineProps({
	identifyCode: {
		type: String,
		default: "1234",
	},
	fontSizeMin: {
		type: Number,
		default: 16,
	},
	fontSizeMax: {
		type: Number,
		default: 40,
	},
	backgroundColorMin: {
		type: Number,
		default: 180,
	},
	backgroundColorMax: {
		type: Number,
		default: 240,
	},
	colorMin: {
		type: Number,
		default: 50,
	},
	colorMax: {
		type: Number,
		default: 160,
	},
	lineColorMin: {
		type: Number,
		default: 40,
	},
	lineColorMax: {
		type: Number,
		default: 180,
	},
	dotColorMin: {
		type: Number,
		default: 0,
	},
	dotColorMax: {
		type: Number,
		default: 255,
	},
	contentWidth: {
		type: Number,
		default: 112,
	},
	contentHeight: {
		type: Number,
		default: 38,
	},
});

watch(
	() => props.identifyCode,
	() => {
		drawPic();
	},
);
onMounted(() => {
	drawPic();
});
// 随机数字
const randomNum = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};
// 随机颜色
const randomColor = (min, max) => {
	let r = randomNum(min, max);
	let g = randomNum(min, max);
	let b = randomNum(min, max);
	return "rgb(" + r + "," + g + "," + b + ")";
};
// 绘制验证码
const drawPic = () => {
	let canvas = document.getElementById("s-canvas");
	let ctx = canvas.getContext("2d");
	ctx.textBaseline = "bottom";
	// 绘制背景
	ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax);
	ctx.fillRect(0, 0, props.contentWidth, props.contentHeight);
	// 绘制文字
	for (let i = 0; i < props.identifyCode.length; i++) {
		drawText(ctx, props.identifyCode[i], i);
	}
	drawLine(ctx);
	drawDot(ctx);
};
// 绘制文字
const drawText = (ctx, txt, i) => {
	ctx.fillStyle = randomColor(props.colorMin, props.colorMax);
	ctx.font = randomNum(props.fontSizeMin, props.fontSizeMax) + "px SimHei";
	let x = (i + 1) * (props.contentWidth / (props.identifyCode.length + 1));
	let y = randomNum(props.fontSizeMax, props.contentHeight - 5);
	var deg = randomNum(-45, 45);
	// 修改坐标原点和旋转角度
	ctx.translate(x, y);
	ctx.rotate((deg * Math.PI) / 180);
	ctx.fillText(txt, 0, 0);
	// 恢复坐标原点和旋转角度
	ctx.rotate((-deg * Math.PI) / 180);
	ctx.translate(-x, -y);
};
// 绘制干扰线
const drawLine = (ctx) => {
	for (let i = 0; i < 8; i++) {
		ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax);
		ctx.beginPath();
		ctx.moveTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx.lineTo(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight));
		ctx.stroke();
	}
};
// 绘制干扰点
const drawDot = (ctx) => {
	for (let i = 0; i < 100; i++) {
		ctx.fillStyle = randomColor(0, 255);
		ctx.beginPath();
		ctx.arc(randomNum(0, props.contentWidth), randomNum(0, props.contentHeight), 1, 0, 2 * Math.PI);
		ctx.fill();
	}
};
</script>
