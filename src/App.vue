<template>
	<Header />
	<Home />
	<Information />
	<Countdown />
	<Ubication ref="ubication" />
	<Coming @toggleShowForm="toggleShowForm" />
	<transition name="fade">
		<Assistance
			v-if="showForm"
			ref="hiddenSection"
			class="hidden-section"
		/>
	</transition>
	<img :src="footerSrc" alt="Footer" id="footerImg" />
</template>

<script setup>
import footerSrc from "./assets/footer.svg";
import Header from "./components/Header.vue";
import Home from "./components/Home.vue";
import Information from "./components/Information.vue";
import Countdown from "./components/Countdown.vue";
import Ubication from "./components/Ubication.vue";
import Coming from "./components/Coming.vue";
import Assistance from "./components/Assistance.vue";
import { ref, nextTick } from "vue";
import { onMounted } from "vue";
import { useGuestStore } from "./stores";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase/init";
import { fetchGuests } from "./utils/localStorage";

const showForm = ref(false);
const hiddenSection = ref(null);
const ubication = ref(null);

function toggleShowForm() {
	showForm.value = !showForm.value;
	if (showForm.value) {
		// Scroll to the section after it becomes visible
		nextTick(() => {
			hiddenSection.value?.$el.scrollIntoView({ behavior: "smooth" });
			hiddenSection.value?.$el.classList.remove("hidden-section");
		});
	} else {
		ubication.value?.$el.scrollIntoView({ behavior: "smooth" });
		hiddenSection.value?.$el.classList.add("hidden-section");
	}
}

onMounted(async () => {
	const guests = await fetchGuests();
	useGuestStore.invitados = guests;
});
</script>

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
