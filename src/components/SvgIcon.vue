<template>
	<svg aria-hidden="true">
		<use :href="`#${prefix}-${name}`" />
	</svg>
</template>
<script setup>
defineProps({
	prefix: {
		type: String,
		default: "icon",
	},
	name: {
		type: String,
		required: true,
	},
});
</script>
