<template>
    <section>
        <form @submit.prevent="enviarRsvp" class="formAssistance column">
            <div>
                <label for="nombre" class="tituloPregunta">NOMBRE</label>
                <AutoComplete id="nombre" :suggestions="invitados" @complete="search" v-model="formulario.nombre" />
            </div>
            <div>
                <p class="tituloPregunta">¿CONFIRMÁS TU ASISTENCIA?</p>
                <div>
                    <div class="radioContainer">
                        <RadioButton inputId="si" name="asistencia" v-model="formulario.asistencia" value="si" />
                        <label for="si">Sí</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="no" name="asistencia" v-model="formulario.asistencia" value="no" />
                        <label for="no">No</label>
                    </div>
                </div>
            </div>
            <div>
                <p class="tituloPregunta">RESTRICCIÓN ALIMENTARIA</p>
                <div>
                    <div class="radioContainer">
                        <RadioButton inputId="ninguna" name="restriccion" v-model="formulario.restriccion"
                            value="ninguna" />
                        <label for="ninguna">Ninguna</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="celiaco" name="restriccion" v-model="formulario.restriccion"
                            value="celiaco" />
                        <label for="celiaco">Celíaco</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="vegetariano" name="restriccion" v-model="formulario.restriccion"
                            value="vegetariano" />
                        <label for="vegetariano">Vegetariano</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="kosher" name="restriccion" v-model="formulario.restriccion"
                            value="kosher" />
                        <label for="kosher">Kosher</label>
                    </div>
                </div>
            </div>
            <div>
                <p class="tituloPregunta">¿USARÍAS MICRO?</p>
                <div>
                    <div class="radioContainer">
                        <RadioButton inputId="si" name="micro" v-model="formulario.micro" value="si" />
                        <label for="si">Sí</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="no" name="micro" v-model="formulario.micro" value="no" />
                        <label for="no">No</label>
                    </div>
                    <div class="radioContainer">
                        <RadioButton inputId="nose" name="micro" v-model="formulario.micro" value="nose" />
                        <label for="nose">Todavía no sé</label>
                    </div>
                </div>
            </div>
            <div>
                <label for="pregunta" class="tituloPregunta">¿TENÉS ALGUNA PREGUNTA?</label>
                <input type="text" id="pregunta">
            </div>
            <div>
                <label for="confirmarFamiliar" class="tituloPregunta">CONFIRMAR POR UN FAMILIAR</label>
                <input type="text" id="confirmarFamiliar">
            </div>
            <!-- TO DO - REVISAR -->
            <!-- <div>
                <label for="nombre">Asiste a la fiesta?</label>
                <Dropdown v-model="formulario.asiste" :options="opciones" placeholder="Seleccionar" />
            </div>
            <div>
                <label for="nombre">Restricciones alimentarias:</label>
                <div>
                    <div v-for="restriccion in restricciones" :key="restriccion.key" class="flex align-items-center">
                        <Checkbox v-model="formulario.restricciones_alimentarias" :inputId="restriccion.key"
                            name="dynamic" :value="restriccion.name" />
                        <label :for="restriccion.key" class="ml-2">{{ restriccion.name }}</label>
                    </div>
                    <InputText type="text" v-model="otra_restriccion"
                        v-if="formulario.restricciones_alimentarias.includes('Otro')" />
                </div>
            </div> -->

            <button type="submit" class="botonPrimario">Enviar</button>
        </form>
        <img src="/src/assets/final.png" alt="">
    </section>
</template>

<script>
import RadioButton from 'primevue/radiobutton';
import AutoComplete from 'primevue/autocomplete';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { invitados } from '../invitados';

export default {
    data() {
        return {
            formulario: {
                nombre: "",
                asiste: "",
                // restricciones_alimentarias: [],
                asistencia: null,
                restriccion: null,
                micro: null,
            },
            otra_restriccion: "",
            opciones: ["Si", "No"],
            restricciones: [
                { name: 'Celiaco', key: 'Celiaco' },
                { name: 'Vegetariano', key: 'Vegetariano' },
                { name: 'Kosher', key: 'Kosher' },
                { name: 'Otro', key: 'Otro' }
            ],
            invitados: [...invitados]
        }
    },
    methods: {
        enviarRsvp() {
            console.log(this.formulario);

        },
        search(event) {
            this.invitados = invitados.filter(inv => inv.toLowerCase().includes(this.formulario.nombre.toLowerCase()))
        }
    },
    components: {
        AutoComplete,
        Dropdown,
        Checkbox,
        InputText,
        RadioButton
    }
}
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
.p-radiobutton-box:checked{
    border: 1px solid #2196F3 !important;
    background: none;
}
.p-radiobutton-input:not(:checked) ~ .p-radiobutton-box{
    border: 1px solid #545438;
}
</style>

<style scoped>
section {
    padding: 0;
}

form {
    gap: 1rem;
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
    background: none;
}

.tituloPregunta{
    font-size: 0.85rem;
    font-weight: 600;

}

.radioContainer {
    flex-direction: row;
    align-items: center;
}

button {
    width: max-content;
    align-self: center;
}

img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    object-fit: cover;
}
</style>