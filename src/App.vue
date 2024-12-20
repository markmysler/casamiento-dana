<script>
export default {
	name: "App",
};
</script>

<template>
	<router-view />
</template>

<style>
.hidden-section {
	opacity: 0;
	transform: translateY(10px);
	transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s, transform 0.5s;
}

/* Entering (fade in and slide down) */
.fade-enter-from {
	opacity: 0;
	transform: translateY(10px);
}
.fade-enter-to {
	opacity: 1;
	transform: translateY(0);
}

/* Leaving (fade out and slide up) */
.fade-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
#app {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow-x: hidden;
}
</style>
