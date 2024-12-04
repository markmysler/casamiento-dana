<template>
	<section class="columnAlignCenter" id="confirmation">
		<h2>¿<span>Venís</span> ?</h2>
		<p class="text-center">NOS ENCANTARÍA COMPARTIRLO CON VOS</p>
		<button class="botonPrimario" @click="handleClick">
			{{ isOpen ? "CANCELAR" : "CONFIRMAR ASISTENCIA" }}
		</button>
		<img src="../assets/plants_left .svg" alt="Plantas decorativas" />
	</section>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
		};
	},
	props: {
		toggleShowForm: Function,
	},
	methods: {
		handleClick(event) {
			this.isOpen = !this.isOpen;
			this.$emit("toggleShowForm");
		},
	},
	emits: ["toggleShowForm"],
};
</script>

<style scoped>
section {
	gap: 0.5rem;
	padding: 2rem 0;
	z-index: 100;
	position: relative;
	background-image: url("../assets/background.svg");
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
}

h2 {
	font-family: "Times New Roman", Times, serif;
	margin-bottom: 0.5rem;
}

h2 span {
	font-family: "Gyahegi", sans-serif;
	text-align: center;
	font-size: 2.25rem;
	font-weight: 600;
	color: #8c8c56;
}

p {
	color: #8c8c56;
	font-size: 0.79rem;
}

button {
	padding: 0.5rem 0.625rem;
	min-width: 10rem;
	cursor: pointer;
}

img {
	position: absolute;
	left: 0;
	top: 20%;
	z-index: 100;
	height: 8rem;
}
</style>
