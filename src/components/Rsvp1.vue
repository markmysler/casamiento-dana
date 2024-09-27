<template>
    <section id="rsvp1">
        <h2>Asistencia y restricciones alimentarias</h2>
        <form @submit.prevent="enviarRsvp">
            <div class="flex flex-column gap-2">
                <label for="nombre">Nombre del invitado:</label>
                <AutoComplete id="nombre" :suggestions="invitados" @complete="search" v-model="formulario.nombre" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="nombre">Asiste a la fiesta?</label>
                <Dropdown v-model="formulario.asiste" :options="opciones" placeholder="Seleccionar" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="nombre">Restricciones alimentarias:</label>
                <div>
                    <div v-for="restriccion in restricciones" :key="restriccion.key" class="flex align-items-center">
                        <Checkbox v-model="formulario.restricciones_alimentarias" :inputId="restriccion.key" name="dynamic" :value="restriccion.name" />
                        <label :for="restriccion.key" class="ml-2">{{ restriccion.name }}</label>
                    </div>
                <InputText type="text" v-model="otra_restriccion" v-if="formulario.restricciones_alimentarias.includes('Otro')" />
                </div>
            </div>
            
            <button type="submit">Enviar</button>
        </form>
    </section>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { invitados } from '../invitados';

export default {
    data(){
        return {
            formulario: {
                    nombre: "",
                    asiste: "",
                    restricciones_alimentarias: [],
            },
            otra_restriccion: "",
            opciones: ["Si", "No"],
            restricciones: [
                { name: 'Celiaco', key: 'Celiaco' },
                { name: 'Vegetariano', key: 'Vegetariano' },
                { name: 'Kosher', key: 'Kosher' },
                { name: 'Otro', key: 'Otro' }
            ],
            invitados:[...invitados]
        }
    },
    methods:{
        enviarRsvp(){
            console.log(this.formulario);
            
        },
        search(event){
            this.invitados =  invitados.filter(inv=>inv.toLowerCase().includes(this.formulario.nombre.toLowerCase()))
        }
    },
    components:{
        AutoComplete,
        Dropdown,
        Checkbox,
        InputText
    }
}


</script>