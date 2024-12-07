<template>
  <section>
    <div class="timesContainer" v-if="timeRemaining">
      <div class="timebox">
        <div class="time columnAlignCenter">
          <p class="column"><span>{{ timeRemaining.days }}</span>Días</p>
        </div>
      </div>
      <div class="timebox">
        <div class="time columnAlignCenter">
          <p class="column"><span>{{ timeRemaining.hours }}</span>Horas</p>
        </div>
      </div>
      <div class="timebox">
        <div class="time columnAlignCenter">
          <p class="column"><span>{{ timeRemaining.minutes }}</span>Minutos</p>
        </div>
      </div>
      <div class="timebox">
        <div class="time columnAlignCenter">
          <p class="column"><span>{{ timeRemaining.seconds }}</span>Segundos</p>
        </div>
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
  background-color: #BCB398;
  border-top: 4px solid #D9D6C3;
  border-right: 0;
  border-left: 0;
  padding: 1.9rem 1.5rem;
}

.timesContainer {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.timebox {
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: rgba(217, 214, 195, 0.5);
  border-radius: 10px;
  padding: 0.2rem 0.5rem 0.5rem 0.5rem;
}

.time {
  width: 100%;
}

.time p {
  color: #F5F9ED;
  font-size: 0.75rem;
}

.time p span {
  font-size: 1.5rem;
  height: 100%;
  font-family: "Playfair Display", serif;
  margin-bottom: 0.1rem;
}

@media (width >=480px) {
  .timebox {
    width: 5rem;
    height: 5rem;
  }

  .time p {
    font-size: 0.875rem;
  }

  .time p span {
    font-size: 1.75rem;
  }
}

@media (width >=900px) {
  section {
    border-width: 8px;
  }

  .timesContainer {
    gap: 1.5rem;
  }
  
	.timebox {
		width: 7rem;
		height: 7rem;
    border-radius: 18px;
	}

  .time p {
    font-size: 1.25rem;
  }

  .time p span {
    font-size: 2.5rem;
  }
}

@media (width >=1080px) {
  section {
    padding: 3rem 0;
  }

  .timebox {
    width: 8rem;
    height: 8rem;
  }

  .time p {
    font-size: 1.5rem;
  }

  .time p span {
    font-size: 3rem;
  }
}
</style>
