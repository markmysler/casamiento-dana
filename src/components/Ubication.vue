<template>
  <section class="columnAlignCenter">
    <h2 class="text-center">Ubicación</h2>
    <div>
      <p class="text-center">LA POSADA MULTIESPACIOS</p>
      <p class="text-center">
        Geronimo, J.M. Loreto 4551, Benavidez Provincia de Buenos Aires
      </p>
    </div>
    <div class="googleMaps">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.8815280999047!2d-58.66744862515988!3d-34.378933345660165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca0df9cfc5d7d%3A0x45d27777e5b100b4!2sLa%20Posada%20Multiespacios!5e0!3m2!1sen!2sar!4v1727466853090!5m2!1sen!2sar"
        allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>

<style scoped>
section {
  gap: 0.7rem;
  background-color: #545438;
  border-top: 4px solid #888468;
  padding: 1.5rem 1.25rem;
}

h2 {
  color: #F5F9ED;
  font-weight: lighter;
}

div:first-of-type {
  max-width: 70%;
}

p {
  color: #F5F9ED;
  font-size: 0.7rem;
  font-weight: 400;
  margin-bottom: 0.9rem;
}

p:first-of-type {
  font-size: 1rem;
  margin-bottom: 0.35rem;
}

iframe {
  width: 100%;
  height: 12.5rem;
  border: 5px solid #8C8C56;
  border-radius: 12px;
}

@media (width >=480px) {
  p {
    font-size: 0.875rem;
  }

  p:first-of-type {
    font-size: 1.125rem;
  }
}

@media (width >=900px) {
  section {
    gap: 2rem;
    border-width: 8px;
  }

  h2 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0;
  }

  p:first-of-type {
    font-size: 1.375rem;
  }

  .googleMaps {
    width: 65%;
  }

  .googleMaps iframe {
    height: 25rem;
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
    font-size: 1.25rem;
  }

  p:first-of-type {
    font-size: 1.5rem;
  }
}
</style>