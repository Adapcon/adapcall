<template>
  <div id="app">
		<table>
			<tr>
				<th> ID </th>
				<th> Solicitante </th>
				<th> Solicitado </th>
			</tr>
			<tr v-for="ligacao in ligacoes" :key="ligacao.id">
				<td> {{ ligacao.id }} </td>
				<td> {{ ligacao.solicitante }} </td>
				<td> {{ ligacao.solicitado }}
					<span v-if="ligacao.urgente"> URGENTE!!! </span>
					<span v-else> (de boas) </span>
				</td>
			</tr>
		</table>
		<input
			type="button"
			@click="criarLigacao"
			value="Criar Ligação"
		>
  </div>
</template>

<script>
export default {
	data() {
		return {
			ligacoes: [
				{
					id: 2424,
					solicitante: "Germano",
					solicitado: "Luís TI Colcci",
					urgente: false,
				},
				{
					id: 2425,
					solicitante: "Márcio",
					solicitado: "Fernando TI Colcci",
					urgente: true,
				},
			],
		};
	},
	methods: {
		criarLigacao() {
			this.ligacoes.push({
				id: 2426,
				solicitante: "Sérgio",
				solicitado: "Luís TI Colcci",
				urgente: false,
			})
		}
	}
};
</script>

<style>
</style>
