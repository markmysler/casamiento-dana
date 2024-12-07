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

.separator {
    margin-top: 0.2rem;
}

@media (width >=480px) {
    a {
        font-size: 0.75rem;
    }
}

@media (width >=660px) {
    a {
        font-size: 0.875rem;
    }
}

@media (width >=900px) {
    a {
        font-size: 1rem;
    }
}

@media (width >=1080px) {
    header {
        padding: 2rem 1.5rem;
    }

    a {
        font-size: 1.125rem;
    }
}
</style>
