<template>
  <div id="app">
		<Ligacoes
			:ligacoes="ligacoes"
		/>
		<FormLigacao
			:ligacoes="ligacoes"
			@setar-lista="setarListar"
			@inserir-lista="inserirLista"
		/>
  </div>
</template>

<script>

import Ligacoes from './components/Ligacoes'
import FormLigacao from './components/FormLigacao'

export default {
	components: {
		Ligacoes,
		FormLigacao,
	},
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
		setarListar(valor) {
			this.ligacoes = valor
		},
		inserirLista(ligacao) {
			this.ligacoes.push(ligacao)
		},
	}
};
</script>

<style>
</style>
