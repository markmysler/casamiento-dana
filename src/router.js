// router.js
import { createRouter, createWebHistory } from "vue-router";
import Guest from "./views/Guest.vue";
import Dana from "./views/Dana.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
	{ path: "/", component: Guest },
	{ path: "/data", component: Dana },
	{ path: "/:pathMatch(.*)*", component: NotFound }, // Catch-all for 404
];

const router = createRouter({
	history: createWebHistory(), // Enables HTML5 History Mode
	routes,
});

export default router;
