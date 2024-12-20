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
import footerSrc from "../assets/footer.png";
import Header from "../components/Header.vue";
import Home from "../components/Home.vue";
import Information from "../components/Information.vue";
import Countdown from "../components/Countdown.vue";
import Ubication from "../components/Ubication.vue";
import Coming from "../components/Coming.vue";
import Assistance from "../components/Assistance.vue";
import { ref, nextTick, computed } from "vue";
import { onMounted } from "vue";
import { useGuestStore } from "../stores";
import { fetchGuests } from "../utils/localStorage";

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
