<template>
    <header class="text-center">
        <ul>
            <li><a href="#home">HOME</a></li>
            <li class="separator">•</li>
            <li><a href="#information">INFORMACIÓN</a></li>
            <li class="separator">•</li>
            <li><a href="#confirmation">CONFIRMACIÓN</a></li>
        </ul>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    padding: 1.5rem 1.25rem;
}

header ul {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.25rem;
}

a {
    text-decoration: none;
    font-size: 0.65rem;
    font-weight: 700;
    color: #545438;
}

.separator{
    margin-top: 0.2rem;
}
</style>
