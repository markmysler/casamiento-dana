<template>
	<section>
		<form @submit.prevent="enviarRsvp" class="formAssistance column">
			<AssistanceForm
				v-for="(formulario, index) in formularios"
				:key="index"
				:index="index"
				@update_form="updateForm"
				@remove="removeInvitado"
				:formulario="formularios[index]"
			/>

			<Divider />

			<div>
				<label for="pregunta" class="tituloPregunta"
					>¿TENÉS ALGUNA PREGUNTA?
					<small> Se puede omitir</small></label
				>
				<input type="text" id="pregunta" v-model="pregunta" />
			</div>

			<div>
				<label for="confirmarFamiliar" class="tituloPregunta"
					>CONFIRMAR POR UN FAMILIAR</label
				>
				<Dropdown
					inputId="confirmarFamiliar"
					:options="invitados_original"
					v-model="nombre_familiar"
					placeholder="Seleccionar familiar"
					filter
					class="d-flex flex-row border-1 rounded-pill"
					:disabled="!areFormsComplete()"
				/>
			</div>

			<button
				type="submit"
				class="botonPrimario"
				:disabled="!areFormsComplete()"
			>
				Enviar
			</button>
		</form>
	</section>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import AssistanceForm from "./AssistanceForm.vue";
import Divider from "primevue/divider";
import { useGuestStore } from "../stores";
import {
	addDoc,
	collection,
	doc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/init";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";

export default {
	data() {
		return {
			store: useGuestStore,
			formularios: [
				{
					nombre: "",
					asistencia: "",
					restriccion: null,
					micro: null,
				},
			],
			nombre_familiar: "",
			otra_restriccion: "",
			opciones: ["Si", "No"],
			restricciones: [
				{ name: "Celiaco", key: "Celiaco" },
				{ name: "Vegetariano", key: "Vegetariano" },
				{ name: "Kosher", key: "Kosher" },
				{ name: "Otro", key: "Otro" },
			],
			invitados_original: [],
			lista_invitados: [],
			pregunta: "",
		};
	},
	methods: {
		async enviarRsvp() {
			try {
				const col = collection(db, "guests");

				// Process all formularios and update RSVPs
				await Promise.all(
					this.formularios.map(async (formulario) => {
						const invitado_index = this.store.invitados.findIndex(
							(inv) => inv.fullname == formulario.nombre
						);

						if (invitado_index == -1) {
							this.throwError(
								"Error en el formulario",
								"invitado ya envió su confirmación"
							);
							return; // Skip to next iteration
						}
						const ref = doc(
							col,
							this.store.invitados[invitado_index].id
						);

						// Update RSVP for the guest
						await updateDoc(ref, {
							rsvp: true,
							data: formulario,
							sentAt: serverTimestamp(),
						}).catch((error) => {
							this.throwError(
								"Error updating document",
								JSON.stringify(error)
							);
							return;
						});
					})
				);
				// Clear localStorage
				localStorage.clear();

				// Handle pregunta if provided
				if (this.pregunta.length > 0) {
					const preguntasRef = collection(db, "preguntas");
					await addDoc(preguntasRef, {
						nombre: this.formularios[0].nombre,
						pregunta: this.pregunta,
						createdAt: serverTimestamp(),
					}).catch((error) => {
						this.throwError(
							"Error adding pregunta: ",
							JSON.stringify(error)
						);
						return;
					});
				}

				// Show confirmation alert
				await Swal.fire({
					title: "Confirmado!",
					text: "Se envió el formulario!",
					icon: "success",
					showCancelButton: false,
					confirmButtonText: "Volver",
				}).then((res) => {
					if (res.isConfirmed || res.isDenied) {
						location.reload();
					}
				});
			} catch (error) {
				this.throwError(
					"Unexpected error in enviarRsvp: ",
					JSON.stringify(error)
				);
				return;
			}
		},

		updateForm(index, newForm) {
			this.formularios[index] = newForm;
		},
		removeInvitado(index) {
			this.formularios.splice(index, 1);
		},
		areFormsComplete() {
			const incomplete_forms = this.formularios.filter((form) => {
				for (const key in form) {
					if (form[key] == "" || form[key] === null) {
						return true;
					}
				}
				return false;
			});

			return incomplete_forms.length === 0;
		},
		updateLocalForms() {
			this.lista_invitados = this.store.invitados.map(
				(inv) => inv.fullname
			);
			this.invitados_original = this.store.invitados.map(
				(inv) => inv.fullname
			);
		},
		throwError(title, text) {
			Swal.fire({
				title: title,
				text: text,
				icon: "error",
				showCancelButton: false,
				confirmButtonText: "Atras",
			});
		},
	},
	components: {
		InputText,
		RadioButton,
		AssistanceForm,
		Divider,
		Dropdown,
	},
	watch: {
		nombre_familiar: {
			immediate: true,
			handler(newVal) {
				if (
					newVal.length > 0 &&
					this.invitados_original.includes(newVal)
				) {
					this.formularios.push({
						nombre: newVal,
						asistencia: "",
						restriccion: null,
						micro: null,
					});
					this.nombre_familiar = "";
				}
			},
		},
	},
	mounted() {
		this.updateLocalForms();
	},
};
</script>

<style>
.swal2-confirm {
	background-color: #8c8c56;
}
.formAssistance .p-inputtext,
.formAssistance input {
	width: 100%;
	background: none;
	border: 1px solid #545438;
	border-radius: 999px;
	padding: 0.35rem 1rem;
}
.p-radiobutton-box:checked {
	border: 1px solid #2196f3 !important;
	background: none;
}
.p-radiobutton-input:not(:checked) ~ .p-radiobutton-box {
	border: 1px solid #545438;
	background: none;
}

.tituloPregunta {
	font-size: 0.85rem;
	font-weight: 600;
}
.p-dropdown-label {
	border: none !important;
}
.p-dropdown {
	width: 100%;
	background: none;
	border: 1px solid #545438;
	border-radius: 999px;
}
.p-dropdown-filter {
	padding-left: 2rem;
}
.p-dropdown-panel .p-dropdown-header .p-dropdown-filter-icon {
	top: 0.4rem;
}
</style>

<style scoped>
section {
	padding: 0;
	z-index: 1;
}

form {
	max-width: 500px;
	gap: 1rem;
	margin: 0 auto;
	padding: 1.75rem 1.25rem;
}

form div {
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
}

label,
p {
	font-size: 0.85rem;
	color: #545438;
	letter-spacing: 0.06rem;
}

button {
	width: max-content;
	align-self: center;
}
button:disabled {
	opacity: 0.5;
}

img {
	width: 100%;
	height: 100%;
	vertical-align: bottom;
	object-fit: cover;
}

@media (width >=480px) {
	form {
		max-width: 600px;
		padding: 2rem;
	}
}

@media (width >=600px) {
	label {
		font-size: 1rem;
	}

	form div {
		gap: 0.5rem;
	}
}

@media (width >=900px) {
	section {
		padding: 3rem 0;
	}

	form {
		max-width: 700px;
		padding: 3rem;
	}

	label {
		font-size: 1.125rem;
	}

	form div {
		gap: 0.75rem;
	}
}

@media (width >=1080px) {
	form {
		max-width: 800px;
		padding: 4rem;
	}
}

@media (width >=1440px) {
	form {
		max-width: 900px;
		padding: 5rem;
	}

	form div {
		gap: 1rem;
	}

	label {
		font-size: 1.25rem;
	}
}
</style>
