<template>
  <section class="columnAlignCenter">
    <h2 class="text-center">Ubicación</h2>
    <div>
      <p class="text-center">LA POSADA MULTIESPACIOS</p>
      <p class="text-center">
        Geronimo, J.M. Loreto 4551, Benavidez Provincia de Buenos Aires
      </p>
    </div>
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.8815280999047!2d-58.66744862515988!3d-34.378933345660165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca0df9cfc5d7d%3A0x45d27777e5b100b4!2sLa%20Posada%20Multiespacios!5e0!3m2!1sen!2sar!4v1727466853090!5m2!1sen!2sar"
        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>

<style scoped>
section {
  gap: 1.25rem;
  background-color: #545438;
  padding: 1.5rem 1.25rem;
}

h2 {
  color: #B5B59F;
}

div:first-of-type {
  max-width: 70%;
}

p {
  color: #AAAA92;
  font-size: 0.65rem;
  font-weight: 600;
}

p:first-of-type {
  font-size: 0.8rem;
  margin-bottom: 0.35rem;
}

iframe {
  width: 100%;
  height: 12.5rem;
  border: 5px solid #878D5F;
  border-radius: 12px;
}
</style>