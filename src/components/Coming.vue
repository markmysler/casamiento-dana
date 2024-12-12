<template>
	<section class="columnAlignCenter bgCover" id="confirmation">
		<h2>¿<span>Venís</span> ?</h2>
		<p class="text-center">NOS ENCANTARÍA COMPARTIRLO CON VOS</p>
		<button class="botonPrimario" @click="handleClick">
			{{ isOpen ? "CANCELAR" : "CONFIRMAR ASISTENCIA" }}
		</button>
		<img class="plants" src="../assets/plants_left .svg" alt="Plantas decorativas" />
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
	position: relative;
	z-index: 100;
	padding: 2rem 0;
	background-image: url('../assets/fondoComing.svg');
	border-top: 4px solid #9ea08d;
}

.background {
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 0;
	object-fit: cover;
	background: #F5F9ED;
}

h2 {
	position: relative;
	z-index: 100;
	font-family: "Times New Roman", Times, serif;
	margin-bottom: 0.5rem;
}

h2 span {
	position: relative;
	z-index: 100;
	font-family: "Gyahegi", sans-serif;
	text-align: center;
	font-size: 2.25rem;
	font-weight: 600;
	color: #8c8c56;
}

p {
	position: relative;
	z-index: 100;
	color: #8c8c56;
	font-size: 0.79rem;
}

button {
	position: relative;
	z-index: 100;
	padding: 0.5rem 0.625rem;
	min-width: 10rem;
	cursor: pointer;
}

.plants {
	position: absolute;
	left: 0;
	top: 35%;
	z-index: 100;
	height: 6rem;
}

@media (width >=480px) {
	p {
		font-size: 0.875rem;
	}

	button {
		padding: 0.75rem 1rem;
	}

	.plants {
		height: 10rem;
		top: 15%;
	}
}

@media (width >=660px) {
	.plants {
		height: 12rem;
		top: 5%;
	}
}

@media (width >=900px) {
	section {
		gap: 1.25rem;
		border-width: 8px;
	}

	h2,
	h2 span {
		font-size: 2.5rem;
		margin-bottom: 0;
	}

	p {
		font-size: 1rem;
	}

	button {
		padding: 0.75rem 2rem;
	}

	.plants {
		height: 15rem;
		top: 0;
	}
}

@media (width >=1080px) {
	section {
		padding: 3rem 0;
	}

	h2,
	h2 span {
		font-size: 2.75rem;
	}

	p {
		font-size: 1.25rem;
	}

	button {
		padding: 1rem 2.5rem;
	}

	.plants {
		height: 18rem;
		top: -5%;
	}
}

@media (width >=1440px) {
	section {
		padding: 4rem 0;
	}

	h2,
	h2 span {
		font-size: 3rem;
	}

	p {
		font-size: 1.5rem;
	}

	button {
		padding: 1.25rem 3rem;
	}

	.plants {
		height: 20rem;
		top: 5%;
	}
}
</style>
