<template>
    <section id="home">
        <div class="homeContainer">
            <h1>Dana&nbsp;&&nbsp;Ivan</h1>
            <p>¡NOS CASAMOS!</p>
        </div>
    </section>
</template>

<style scoped>
    section {
        height: 37.5rem;
        background-color: #8C8C56;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        width: max-content;
        position: absolute;
        left: 47%;
        top: 43.5%;
        transform: translate(-50%, -50%) rotate(270deg);
        vertical-align: bottom;
        font-size: 3.1rem;
        font-weight: lighter;
        color: #F5F9ED;
    }

    p {
        position: absolute;
        bottom: 12%;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 500;
        color: #F5F9ED;
        margin: 0 auto;
        letter-spacing: 0.09rem;
    }
    .homeContainer{
        width: 30rem;
        height: 37.5rem;
        position: relative;

    }
</style>