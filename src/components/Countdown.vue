<template>
  <section>
    <div class="timesContainer" v-if="timeRemaining">
      <div class="time columnAlignCenter">
        <p class="column"><span>{{ timeRemaining.days }}</span>Dias</p>
      </div>
      <div class="time columnAlignCenter">
        <p class="column"><span>{{ timeRemaining.hours }}</span>Dias</p>
      </div>
      <div class="time columnAlignCenter">
        <p class="column"><span>{{ timeRemaining.minutes }}</span>Dias</p>
      </div>
      <div class="time columnAlignCenter">
        <p class="column"><span>{{ timeRemaining.seconds }}</span>Dias</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      intervalId: null,
      weddingDate: new Date("2025-02-23T11:30:00-03:00"), // Buenos Aires Time (UTC-3)
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
        this.timeRemaining.days = Math.floor(
          difference / (1000 * 60 * 60 * 24)
        );
        this.timeRemaining.hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.timeRemaining.minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.timeRemaining.seconds = Math.floor(
          (difference % (1000 * 60)) / 1000
        );
      } else {
        // Countdown completed, you can handle this scenario (e.g., display a message)
        clearInterval(this.intervalId);
        this.timeRemaining = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    },
  },
};
</script>

<style scoped>
section {
  background-color: #B6AD90;
  border: 4px solid #DCD7C3;
  border-right: 0;
  border-left: 0;
  padding: 1.5rem;
}

.timesContainer {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.time {
  width: 3.625rem;
  height: 4rem;
  justify-content: center;
  text-align: center;
  background-color: #BCB49D;
  border-radius: 10px;
  padding: 0.5rem;
}

.time p {
  color: #E7E3CF;
  font-size: 0.625rem;
}

.time p span {
  font-size: 1.3rem;
}
</style>
