import { invitados } from "../invitados";

export function searchInvitados(event, name) {
	return invitados.filter((inv) =>
		inv.toLowerCase().includes(name.toLowerCase())
	);
}
