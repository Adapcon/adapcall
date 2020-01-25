<template>
	<form @submit.prevent="criarLigacao">
		<fieldset>
			<legend>Criar Ligação</legend>
			{{ ligacao }}
			<div>
				Solicitante:
				<input type="text"
					v-model="ligacao.solicitante"
					required
				>
			</div>
			<div>
				Solicitado:
				<input type="text"
					v-model="ligacao.solicitado"
					required
				>
			</div>
			<div>
				Urgente:
				<input type="checkbox"
					v-model="ligacao.urgente"
				>
			</div>
			<button type="submit"> Criar Ligação </button>
			<button type="button" @click="apagarLista"> Apagar Lista </button>
		</fieldset>
	</form>
</template>

<script>

const novaLigacao = {
	id: '',
	solicitante: '',
	solicitado: '',
	urgente: false,
}

export default {
	props: ['ligacoes'],
	data() {
		return {
			ligacao: { ...novaLigacao },
		}
	},
	methods: {
		criarLigacao() {
			const ligacaoAInserir = {
				...this.ligacao,
				id: this.ligacoes.length,
			}
			this.ligacao = { ...novaLigacao }
			this.$emit('inserir-lista', ligacaoAInserir)
		},
		apagarLista() {
			this.$emit('setar-lista', [])
		}
	}
}
</script>

<style>

</style>