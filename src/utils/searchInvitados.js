import { useGuestStore } from "../stores";

const store = useGuestStore;

export function searchInvitados(event, name) {
	return store.invitados
		.map((inv) => inv.fullname)
		.filter((inv) => inv.toLowerCase().includes(name.toLowerCase()));
}
