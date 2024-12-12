<template>
	<section class="columnAlignCenter" id="information">
		<h2 class="column">Forever <span>& Always</span></h2>
		<div>
			<p class="text-center">23 DE FEBRERO DEL 2025 | 12:00 HS</p>
			<div>
				<button class="botonPrimario" @click="addToGoogleCalendar">
					AGENDAR
				</button>
			</div>
		</div>
		<img src="../assets/plants_center.svg" alt="" />
	</section>
</template>

<script>
export default {
	methods: {
		addToGoogleCalendar() {
			const eventTitle = encodeURIComponent("Casamiento de Ivan y Dana");
			const startDate = "20250223T150000Z";
			const endDate = "20250224T000000Z";
			const description = encodeURIComponent(
				"Venite a la fiesta, no seas cagon."
			);
			const location = encodeURIComponent("La Posada Multiespacios");

			const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${description}&location=${location}&sf=true&output=xml`;

			window.open(googleCalendarUrl, "_blank");
		},
	},
};
</script>

<style scoped>
section {
	gap: 2.4rem;
	padding: 1.875rem 0;
	position: relative;
}

section > div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.6rem;
}

h2 {
	font-size: 2rem;
	color: #8c8c56;
	line-height: 160%;
	font-weight: lighter;
}

h2 span {
	font-family: "Gyahegi", sans-serif;
}

p {
	font-size: 0.8rem;
	font-weight: 600;
	color: #8c8c56;
	font-weight: lighter;
	word-spacing: 0.15rem;
}

img {
	position: absolute;
	right: -10%;
	bottom: -1%;
	z-index: 100;
	height: 25rem;
}

@media (width >=480px) {
	p {
		font-size: 0.9rem;
	}

	img {
		height: 30rem;
		right: -5%;
	}
}

@media (width >=660px) {
	p {
		font-size: 1rem;
	}

	img {
		height: 32.5em;
		right: 0;
	}
}

@media (width >=900px) {
	h2 {
		font-size: 2.5rem;
	}

	section div {
		gap: 2rem;
	}

	p {
		font-size: 1.25rem;
	}

	img {
		height: 38rem;
		top: -17rem;
	}
}

@media (width >=1080px) {
	section {
		padding: 3rem 0;
	}

	h2 {
		font-size: 2.75rem;
	}

	p {
		font-size: 1.5rem;
	}
}

@media (width >=1440px) {
	section {
		padding: 4rem 0;
	}

	h2 {
		font-size: 3rem;
	}

	p {
		font-size: 1.75rem;
	}

	img {
		height: 50rem;
		top: -23rem;
	}
}
</style>
