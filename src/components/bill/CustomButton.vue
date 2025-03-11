<template>
	<button class="custom-button">
		<slot></slot>
	</button>
</template>

<style scoped>
.custom-button {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 3px 10px;
	border: 1px solid var(--color-gray);
	border-radius: 999px; /* 让按钮变成椭圆形 */
	background-color: white;
	color: #2563eb;
	font-size: 14px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

.custom-button:hover {
	background-color: #f0f0f0;
}
</style>
