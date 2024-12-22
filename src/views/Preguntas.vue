<template>
	<h1>Preguntas</h1>
	<div
		class="d-flex flex-wrap align-items-center p-3 gap-3 justify-content-center mt-4"
	>
		<div
			v-for="pregunta in preguntas"
			:key="pregunta.pregunta"
			class="border-1 rounded p-2 pregunta"
		>
			<p>{{ pregunta.pregunta }}</p>
			<small>-{{ pregunta.nombre }}</small>
		</div>
	</div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/init";

export default {
	data() {
		return {
			preguntas: [],
		};
	},
	async mounted() {
		const snapshot = await getDocs(collection(db, "preguntas"));
		this.preguntas = snapshot.docs.map((doc) => {
			return doc.data();
		});
	},
};
</script>

<style scoped>
.pregunta {
	min-width: 15rem;
	min-height: 8rem;
}
</style>
