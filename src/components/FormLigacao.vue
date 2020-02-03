<template>
  <form @submit.prevent="salvar">
    <div v-if="editando">Voce está editando a ligação: {{ formLigacao.id }}</div>
    <fieldset>
      <legend>Criar Ligação</legend>
      {{ formLigacao }}
      <div>
        Solicitante:
        <input type="text" v-model="formLigacao.solicitante" required />
      </div>
      <div>
        Solicitado:
        <input type="text" v-model="formLigacao.solicitado" required />
      </div>
      <div>
        Urgente:
        <input type="checkbox" v-model="formLigacao.urgente" />
      </div>
      <button type="submit">{{ editando ? 'Salvar alterações' : 'Criar Ligação' }}</button>
      <button type="button" @click="apagarLista">Apagar Lista</button>
    </fieldset>
  </form>
</template>

<script>

const novaLigacao = {
  id: '',
  solicitante: '',
  solicitado: '',
  urgente: false,
};

export default {
  props: ['ligacoes', 'ligacao'],
  data() {
    return {
      formLigacao: { ...novaLigacao },
      editando: false,
    };
  },
  mounted() {
    if (this.ligacao) {
      this.formLigacao = { ...this.ligacao };
      this.editando = true;
    } else {
      this.editando = false;
    }
  },
  methods: {
    salvar() {
      // Definindo a ligacao a ser criada/alterada na lista
      const ligacaoAInserir = {
        ...this.formLigacao,
      };

      // Criar
      if (!this.editando) {
        ligacaoAInserir.id = this.ligacoes.length + 1;

        this.$emit('inserir-lista', ligacaoAInserir);
      } else {
        // Editar
        this.$emit('atualizar-lista', ligacaoAInserir);
      }

      // Limpando formulário
      this.formLigacao = { ...novaLigacao };
    },
    apagarLista() {
      this.$emit('setar-lista', []);
    },
  },
};
</script>

<style>
</style>
