<template>
	<section class="bgCover" id="home">
		<div class="homeContainer">
			<h1>Dana&nbsp;&&nbsp;Ivan</h1>
			<p>¡NOS CASAMOS!</p>
		</div>
		<img class="plants" src="../assets/plants_bottom.svg" alt="Plants" />
		<img class="background" src="../assets/background.svg" alt="Fondo venis">
	</section>
</template>

<style scoped>
section {
	height: 37.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	z-index: 100;
	background-image: url('../assets/fondoHero.svg');
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
	background: #8c8c56;
}

h1 {
	width: max-content;
	position: absolute;
	left: 47%;
	top: 43.5%;
	z-index: 100;
	transform: translate(-50%, -50%) rotate(270deg);
	vertical-align: bottom;
	font-size: 3.1rem;
	font-weight: lighter;
	color: #f5f9ed;
}

p {
	position: absolute;
	bottom: 12%;
	left: 0;
	right: 0;
	z-index: 100;
	text-align: center;
	font-size: 0.9rem;
	font-weight: 500;
	color: #f5f9ed;
	margin: 0 auto;
	letter-spacing: 0.09rem;
}

.homeContainer {
	width: 30rem;
	height: 36.5rem;
	position: relative;
	z-index: 100;
}

.plants {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	height: 10rem;
}

@media (width >=480px) {
	.plants {
		height: 15rem;
		top: 5%;
	}
}

@media (width >=660px) {
	p {
		font-size: 1rem;
	}

	.plants {
		height: 20rem;
	}
}

@media (width >=900px) {
	.homeContainer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	h1, p {
		position: static;
		transform: translate(0);
	}

	h1 {
		font-size: 4rem;
	}

	p {
		font-size: 1.375rem;
	}
}

@media (width >=1080px) {
	#home {
		height: 42rem;
	}

	.homeContainer {
		height: 100%;
	}

	h1 {
		font-size: 4.5rem;
	}

	p {
		font-size: 1.5rem;
	}
}

@media (width >=1440px) {
	#home {
		height: 47rem;
	}

	.homeContainer {
		width: 40rem;
	}

	h1 {
		font-size: 5rem;
	}

	p {
		font-size: 1.75rem;
	}

	.plants {
		height: 25rem;
	}
}
</style>
