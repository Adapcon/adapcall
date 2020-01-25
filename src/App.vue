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
		<form @submit.prevent="criarLigacao">
			<fieldset>
				<legend>Criar Ligação</legend>
				{{ ligacao }}
				<div>
					Solicitante:
					<input type="text"
						v-model="ligacao.solicitante"
					>
				</div>
				<div>
					Solicitado:
					<input type="text"
						v-model="ligacao.solicitado"
					>
				</div>
				<button type="submit"> Criar Ligação </button>
			</fieldset>
		</form>
  </div>
</template>

<script>

const novaLigacao = {
	id: '',
	solicitante: '',
	solicitado: '',
}

export default {
	data() {
		return {
			ligacao: { ...novaLigacao },
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
				...this.ligacao,
				id: this.ligacoes.length,
			})
		},
	}
};
</script>

<style>
</style>
