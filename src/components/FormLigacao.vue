<template>
  <div class="col-auto">
    <form @submit.prevent="salvar">
      <div style="text-align: right;">
        <ac-button @click.native.prevent="fechar" type="primary" icon="fa-times">Fechar</ac-button>
      </div>
      <div v-if="editando">Voce está editando a ligação: {{ formLigacao.id }}</div>
      <fieldset :class="{ 'error': errorMessage }" class="form-group">
        <legend :class="{ 'error': errorMessage }">Criar Ligação</legend>
        <div class="form-row align-items-center">
          <div class="col">
            <label>
              Solicitante:
              <input v-model="formLigacao.solicitante" type="text" class="form-control" required />
            </label>
          </div>
          <div class="col">
            <label>
              Solicitado:
              <input v-model="formLigacao.solicitado" type="text" class="form-control" required />
            </label>
          </div>
          <div class="col my-1">
            <div class="custom-control custom-checkbox">
              <input v-model="formLigacao.urgente" id="check" type="checkbox" class="custom-control-input" />
              <label class="custom-control-label" for="check">
                Urgente
              </label>
            </div>
          </div>
        </div>
        <div>
          <ac-button @click.native.prevent="cancelar" type="secondary" :icon="getIcon">Cancelar</ac-button>
          <button type="submit" class="btn btn-primary">{{ editando ? 'Salvar alterações' : 'Criar Ligação' }}</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>

const novaLigacao = {
  id: '',
  solicitante: '',
  solicitado: '',
  urgente: false,
};

export default {
  props: ['ligacoes', 'ligacao', 'errorMessage'],
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
    },
    apagarLista() {
      this.$emit('setar-lista', []);
    },
    fechar() {
      this.$emit('fechar');
    },
    cancelar() {
      this.formLigacao = { ...novaLigacao };
      this.editando = false;
    },
  },
};
</script>
