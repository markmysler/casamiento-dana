<template>
	<div class="table-wrapper">
		<h1>Resumen</h1>
		<div class="numbers">
			<p>Confirmados: {{ confirmados }}</p>
			<p>Pendientes: {{ pendientes }}</p>
			<p>Traidores: {{ traidores }}</p>
		</div>
		<DataTable
			:data="guests"
			:columns="columns"
			:sortable="true"
			:searchable="true"
			class="table table-striped table-responsive table-hover"
			:options="options"
		/>
	</div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import DataTable from "datatables.net-vue3";
import { db } from "../firebase/init";
import DataTablesLib from "datatables.net";
import Buttons from "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.mjs";
import JSZip from "jszip"; // For Excel export

DataTable.use(DataTablesLib);
DataTable.use(Buttons);
window.JSZip = JSZip; // Required for Excel export

export default {
	components: { DataTable },
	data() {
		return {
			guests: [], // Transformed guest data
			columns: [
				{ data: "fullname", title: "Nombre", sortable: true },
				{
					data: "hasConfirmed",
					title: "Confirmo",
					sortable: true,
				},
				{ data: "assistance", title: "Asiste", sortable: true },
				{ data: "bus", title: "Micro", sortable: true },
				{ data: "restriction", title: "Restriccion", sortable: true },
				{ data: "sentAt", title: "Timestamp", sortable: true },
			],
			options: {
				pageLength: 20,
				lengthMenu: [20, 40, 100, { label: "All", value: -1 }],
				language: {
					search: "Buscar: ", // Custom label for the search input
					lengthMenu: "Filas por pagina: _MENU_", // Custom label for the entries selector
					zeroRecords: "No hay datos.", // Label when there are no rows
					info: "Mostrando las filas _START_ a _END_ de _TOTAL_", // Info text
				},
				buttons: true,
				dom: '<"d-flex justify-content-between align-items-center mb-2"lBf>rt<"d-flex justify-content-between align-items-center my-2"i p>',
			},
		};
	},
	async mounted() {
		await this.fetchGuests();
	},
	methods: {
		async fetchGuests() {
			const snapshot = await getDocs(collection(db, "guests"));
			this.guests = snapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					fullname: data.fullname,
					hasConfirmed: data.rsvp ? "si" : "no",
					assistance: data.data?.asistencia
						? data.data.asistencia
						: "",
					bus: data.data?.micro ? data.data.micro : "",
					restriction: data.data?.restriccion
						? data.data.restriccion
						: "",
					sentAt: data.sentAt
						? data.sentAt.toDate().toLocaleString()
						: "",
				};
			});
		},
	},
	computed: {
		confirmados() {
			if (this.guests.length > 0) {
				return this.guests.filter((g) => {
					return g.assistance === "si";
				}).length;
			}
			return "-";
		},
		pendientes() {
			if (this.guests.length > 0) {
				return this.guests.filter((g) => {
					return g.hasConfirmed === "no";
				}).length;
			}
			return "-";
		},
		traidores() {
			if (this.guests.length > 0) {
				return this.guests.filter((g) => {
					return g.assistance === "no";
				}).length;
			}
			return "-";
		},
	},
};
</script>

<style>
@import "datatables.net-dt";

h1 {
	text-align: center;
	margin-bottom: 20px;
}

.datatable {
	width: 90%;
}

.table-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
table {
	border-right: 1px solid rgba(0, 0, 0, 0.3);
	border-left: 1px solid rgba(0, 0, 0, 0.3);
	border-top: 1px solid rgba(0, 0, 0, 0.3);
}
.numbers {
	width: 90%;
	display: flex;
	justify-content: start;
	gap: 20px;
	color: #8c8c56;
	font-weight: bold;
}
.dt-button {
	border-radius: 10px;
	padding: 1px 10px;
	border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
