import { createApp } from "vue";
import { useGuestStore } from "./stores";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core CSS
import "primeicons/primeicons.css"; //icons
import router from "./router";

createApp(App).use(PrimeVue).use(useGuestStore).use(router).mount("#app");
