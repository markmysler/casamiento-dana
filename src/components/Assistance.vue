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

				<AutoComplete
					id="confirmarFamiliar"
					:suggestions="invitados_original"
					@complete="updateInvitados"
					v-model="nombre_familiar"
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
import AutoComplete from "primevue/autocomplete";
import InputText from "primevue/inputtext";
import { searchInvitados } from "../utils/searchInvitados";
import AssistanceForm from "./AssistanceForm.vue";
import Divider from "primevue/divider";
import { useGuestStore } from "../stores";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import { saveToLocalStorage } from "../utils/localStorage";

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
		updateInvitados(event) {
			this.invitados_original = searchInvitados(
				event,
				this.nombre_familiar
			);
		},
		async enviarRsvp() {
			const col = collection(db, "guests");
			this.formularios.forEach(async (formulario) => {
				const invitado_index = this.store.invitados.findIndex(
					(inv) => inv.fullname === formulario.nombre
				);
				if (invitado_index === -1) {
					console.log("Error: invitado ya envio su confirmacion");
					return;
				} else {
					const ref = doc(
						col,
						this.store.invitados[invitado_index].id
					);
					await updateDoc(ref, {
						rsvp: true,
						data: formulario,
					}).catch((error) => {
						console.log(error);
					});
				}
			});

			localStorage.clear();

			if (this.pregunta.length > 0) {
				const preguntasRef = collection(db, "preguntas");
				await addDoc(preguntasRef, {
					nombre: this.formularios[0].nombre,
					pregunta: this.pregunta,
				})
					.then((res) => {
						alert("Confirmado!");
						location.reload();
					})
					.catch((error) => {
						console.log(error);
					});
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
	},
	components: {
		AutoComplete,
		InputText,
		RadioButton,
		AssistanceForm,
		Divider,
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
