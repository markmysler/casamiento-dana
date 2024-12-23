<template>
	<Divider v-if="index != 0" />
	<div class="nameInput">
		<label for="nombre" class="tituloPregunta">{{
			index == 0 ? "NOMBRE" : `NOMBRE FAMILIAR ${index}`
		}}</label>
		<Dropdown
			inputId="nombre"
			:options="localInvitados"
			v-model="localFormulario.nombre"
			placeholder="Seleccionar"
			filter
			class="d-flex flex-row border-1 rounded-pill"
		/>
		<Button
			icon="pi pi-times"
			severity="danger"
			text
			rounded
			aria-label="Cancel"
			class="removeButton"
			@click="$emit('remove', index)"
			v-if="index != 0"
		/>
	</div>
	<div>
		<p class="tituloPregunta">
			{{
				index == 0
					? "¿CONFIRMÁS TU ASISTENCIA?"
					: "¿CONFIRMÁS SU ASISTENCIA?"
			}}
		</p>
		<div>
			<div class="radioContainer">
				<RadioButton
					inputId="si"
					v-model="localFormulario.asistencia"
					value="si"
				/>
				<label for="si">Sí</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="no"
					v-model="localFormulario.asistencia"
					value="no"
				/>
				<label for="no">No</label>
			</div>
		</div>
	</div>
	<div>
		<p class="tituloPregunta">RESTRICCIÓN ALIMENTARIA</p>
		<div>
			<div class="radioContainer">
				<RadioButton
					inputId="ninguna"
					v-model="localFormulario.restriccion"
					value="ninguna"
				/>
				<label for="ninguna">Ninguna</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="celiaco"
					v-model="localFormulario.restriccion"
					value="celiaco"
				/>
				<label for="celiaco">Celíaco</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="vegetariano"
					v-model="localFormulario.restriccion"
					value="vegetariano"
				/>
				<label for="vegetariano">Vegetariano</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="kosher"
					v-model="localFormulario.restriccion"
					value="kosher"
				/>
				<label for="kosher">Kosher</label>
			</div>
		</div>
	</div>
	<div>
		<p class="tituloPregunta">
			{{ index == 0 ? "¿USARÍAS MICRO?" : "¿USARÍA MICRO?" }}
		</p>
		<div>
			<div class="radioContainer">
				<RadioButton
					inputId="si"
					v-model="localFormulario.micro"
					value="si"
				/>
				<label for="si">Sí</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="no"
					v-model="localFormulario.micro"
					value="no"
				/>
				<label for="no">No</label>
			</div>
			<div class="radioContainer">
				<RadioButton
					inputId="nose"
					v-model="localFormulario.micro"
					value="nose"
				/>
				<label for="nose">Todavía no sé</label>
			</div>
		</div>
	</div>
</template>

<script>
import RadioButton from "primevue/radiobutton";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import Button from "primevue/button";
import { useGuestStore } from "../stores";
import Dropdown from "primevue/dropdown";

export default {
	props: {
		formulario: { type: Object, required: true },
		index: { type: Number, required: true },
	},
	data() {
		return {
			store: useGuestStore,
			localFormulario: { ...this.formulario },
			localInvitados: [],
		};
	},
	watch: {
		local_formulario: {
			immediate: true,
			handler(newVal) {
				this.updateFormulario();
			},
		},
		formulario: {
			immediate: true,
			handler(newVal) {
				this.localFormulario = newVal;
			},
		},
	},
	methods: {
		updateFormulario() {
			this.$emit("update_form", this.index, this.localFormulario);
		},
	},
	components: {
		RadioButton,
		InputText,
		Divider,
		Button,
		Dropdown,
	},
	emits: ["update_form", "remove"],
	mounted() {
		this.localInvitados = this.store.invitados.map((inv) => inv.fullname);
	},
};
</script>

<style scoped>
div {
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

.radioContainer {
	flex-direction: row;
	align-items: center;
}

.nameInput {
	position: relative;
}

.removeButton {
	height: min-content;
	position: absolute;
	top: 1.7rem;
	right: 0.5rem;
}

@media (width >=600px) {
	.nameInput,
	div {
		gap: 0.5rem;
	}

	label,
	p {
		font-size: 1rem;
	}
}

@media (width >=900px) {
	.nameInput,
	div {
		gap: 0.75rem;
	}

	label,
	p {
		font-size: 1.125rem;
	}
}

@media (width >=1440px) {
	.nameInput,
	div {
		gap: 1rem;
	}

	label,
	p {
		font-size: 1.25rem;
	}
}
</style>
