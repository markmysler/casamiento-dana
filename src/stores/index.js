import { createStore } from "vuex";

// Create a new store instance.
export const useGuestStore = createStore({
	state() {
		return {
			invitados: [],
		};
	},
});
