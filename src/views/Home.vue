<template>
  <div class="home">
    <!-- Lista -->
    <Ligacoes
      :ligacoes="ligacoes"
      :is-loading="isLoading"
      @excluir="excluir"
      @editar="editar" />

    <!-- Mostra form -->
    <button @click="() => mostraFormulario = !mostraFormulario">Mostrar formulario</button>

    <!-- Formulário -->
    <FormLigacao
      v-if="mostraFormulario"
      :ligacao="ligacao"
      :ligacoes="ligacoes"
      @setar-lista="setarListar"
      @inserir-lista="inserirLista"
      @atualizar-lista="atualizarLista"
    />
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

      isLoading: false,
    };
  },
  async mounted() {
    this.isLoading = true;

    try {
      const res = await axios.get('https://5e3589a4f7e55d0014ad4dc7.mockapi.io/ligacoes');
      console.log('res', res);

      if (Array.isArray(res.data)) this.ligacoes = res.data;

      // sucesso!!! deu tudo certo
    } catch (err) {
      // Deu ruim!!
      console.error('err', err);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    setarListar(valor) {
      this.ligacoes = valor;
    },
    inserirLista(ligacao) {
      // Coloca no final da lista
      this.ligacoes.push(ligacao);

      // Reseta o formulário
      this.resetForm();
    },
    atualizarLista(ligacao) {
      const indice = this.ligacoes.findIndex(l => ligacao.id === l.id);

      // substitui na posição indicada
      this.ligacoes.splice(indice, 1, ligacao);

      // Reseta o formulário
      this.resetForm();
    },
    resetForm() {
      this.mostraFormulario = false;
      this.ligacao = '';
    },
    excluir(indice) {
      // Remove da posição
      this.ligacoes.splice(indice, 1);
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
