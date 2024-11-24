<template>
  <section class="columnAlignCenter" id="information">
    <h2 class="column">Forever <span>& Always</span></h2>
    <div>
      <p class="text-center">23 DE FEBRERO DEL 2025 | 11:30 HS</p>
      <div>
        <button class="botonPrimario" @click="addToGoogleCalendar">
          AGENDAR
        </button>
      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  methods: {
    addToGoogleCalendar() {
      const eventTitle = encodeURIComponent("Casamiento de Ivan y Dana");
      const startDate = "20250223T143000Z";
      const endDate = "20250224T020000Z";
      const description = encodeURIComponent("Venite a la fiesta, no seas cagon.");
      const location = encodeURIComponent("La Posada Multiespacios");

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${description}&location=${location}&sf=true&output=xml`;

      window.open(googleCalendarUrl, "_blank");
    }
  }
}
</script>

<style scoped>
section {
  gap: 2.4rem;
  padding: 1.875rem 0;
}

section > div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}

h2 {
  color: #8C8C56;
  line-height: 160%;
  font-weight: lighter;
}

h2 span {
  font-family: "Gyahegi", sans-serif;
}

p {
  font-size: 0.8rem;
  font-weight: 600;
  color: #8C8C56;
  font-weight: lighter;
  word-spacing: 0.15rem;
}
</style>