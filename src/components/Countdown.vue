<template>
    <div class="countdown">
      <div v-if="timeRemaining">
        <span>{{ timeRemaining.days }} Dias</span>
        <span>{{ timeRemaining.hours }} Horas</span>
        <span>{{ timeRemaining.minutes }} Minutos</span>
        <span>{{ timeRemaining.seconds }} Segundos</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        timeRemaining: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        intervalId: null,
        weddingDate: new Date('2025-02-23T11:30:00-03:00') // Buenos Aires Time (UTC-3)
      };
    },
    mounted() {
      this.calculateTimeRemaining();
      this.intervalId = setInterval(this.calculateTimeRemaining, 1000); // Update every second
    },
    beforeUnmount() {
      if (this.intervalId) {
        clearInterval(this.intervalId); // Clear the interval when the component is destroyed
      }
    },
    methods: {
      calculateTimeRemaining() {
        const now = new Date();
        const difference = this.weddingDate - now;
  
        if (difference > 0) {
          this.timeRemaining.days = Math.floor(difference / (1000 * 60 * 60 * 24));
          this.timeRemaining.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          this.timeRemaining.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          this.timeRemaining.seconds = Math.floor((difference % (1000 * 60)) / 1000);
        } else {
          // Countdown completed, you can handle this scenario (e.g., display a message)
          clearInterval(this.intervalId);
          this.timeRemaining = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .countdown {
    text-align: center;
    font-size: 2rem;
  }
  .countdown span {
    display: inline-block;
    margin: 0 10px;
  }
  </style>