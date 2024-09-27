<template>
    <section class="my-2" id="information">
        <h2>Informacion</h2>
        <Countdown />
        <h3>
            Fecha: 23 de Febrero de 2025
        </h3>
        <h4>Horario de inicio: Once y media de la mañana (11:30hs AM)</h4>
        <div>
            <button @click="addToGoogleCalendar">Add to Google Calendar</button>
        </div>
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3292.8815280999047!2d-58.66744862515988!3d-34.378933345660165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca0df9cfc5d7d%3A0x45d27777e5b100b4!2sLa%20Posada%20Multiespacios!5e0!3m2!1sen!2sar!4v1727466853090!5m2!1sen!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
</template>

<script>
import Countdown from './Countdown.vue';
export default {
   components:{
    Countdown
    },
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