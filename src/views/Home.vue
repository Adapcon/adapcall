<template>
  <div class="home">
    <div v-if="errorMessage" class="error alert alert-danger">
      {{ errorMessage }}
    </div>

    <div v-show="isLoading.list">Carregando...</div>

    <div v-show="!isLoading.list">
      <!-- Mostra form -->
      <div class="mt-3 mb-2">
        <transition name="fade" mode="out-in">
          <ac-button v-show="!mostraFormulario" type="primary" @click.native="() => mostraFormulario = !mostraFormulario" icon="fa-plus">Nova Ligação</ac-button>
        </transition>
      </div>

      <div v-show="isLoading.form">Carregando...</div>
      <div v-show="!isLoading.form">
        <transition name="fade" mode="out-in">
          <!-- Formulário -->
          <FormLigacao
            v-if="mostraFormulario"
            :ligacao="ligacao"
            :ligacoes="ligacoes"
            :error-message="errorMessage"
            @setar-lista="setarListar"
            @inserir-lista="inserirLista"
            @atualizar-lista="atualizarLista"
            @fechar="resetForm"
          />
        </transition>
      </div>

      <!-- Lista -->
      <Ligacoes
        :ligacoes="ligacoes"
        :is-loading="isLoading"
        @excluir="excluir"
        @editar="editar" />
    </div>
  </div>
</template>

<script>

import Ligacoes from '../components/Ligacoes.vue';
import FormLigacao from '../components/FormLigacao.vue';

export default {
  name: 'home',
  components: {
    Ligacoes,
    FormLigacao,
  },
  data() {
    return {
      ligacao: '',
      mostraFormulario: false,
      ligacoes: [],
      errorMessage: '',

      isLoading: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    setarListar(valor) {
      this.ligacoes = valor;
    },
    async getList() {
      const res = await this.request({ id: 'list' });

      if (res && Array.isArray(res.data)) this.ligacoes = res.data;
    },
    async request({ id, ...requestParams } = {}) {
      if (this.isLoading[id]) return;

      this.$set(this.isLoading, id, true);
      this.errorMessage = '';

      try {
        const res = await axios({
          method: 'GET',
          url: 'https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes',
          ...requestParams,
        });

        // Reseta o formulário
        this.resetForm();

        // eslint-disable-next-line consistent-return
        return res;
      } catch (err) {
        this.errorMessage = err.response.data;
        // Deu ruim!!
        console.error('err', err);
      } finally {
        this.$set(this.isLoading, id, false);
      }
    },
    async inserirLista(ligacao) {
      const res = await this.request({
        id: 'form',
        method: 'POST',
        data: ligacao,
      });

      if (res && res.status === 201) {
        // Coloca no final da lista
        this.ligacoes.push(res.data);
      }
    },
    async atualizarLista(ligacao) {
      const res = await this.request({
        id: 'form',
        method: 'PUT',
        url: `https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes/${ligacao.id}`,
        data: ligacao,
      });

      if (res && res.status === 200) {
        const indice = this.ligacoes.findIndex(l => ligacao.id === l.id);

        // substitui na posição indicada
        this.ligacoes.splice(indice, 1, ligacao);
      }
    },
    resetForm() {
      this.mostraFormulario = false;
      this.ligacao = '';
    },
    async excluir(indice) {
      const { id } = this.ligacoes[indice];

      const res = await this.request({
        id,
        method: 'DELETE',
        url: `https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes/${id}`,
      });

      if (res && res.status === 200) {
        // Remove da posição
        this.ligacoes.splice(indice, 1);
      }
    },
    editar(indice) {
      this.ligacao = this.ligacoes[indice];

      this.mostraFormulario = false;

      this.$nextTick(() => {
        this.mostraFormulario = true;
      });
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
