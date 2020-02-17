<template>
  <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th>ID</th>
        <th>Solicitante</th>
        <th>Solicitado</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-show="ligacoes.length === 0">
        <td colspan="4">
          Não há ligações cadastradas
        </td>
      </tr>
      <tr v-for="(ligacao, indice) in ligacoes" :key="ligacao.id">
        <td>{{ ligacao.id }}</td>
        <td>{{ ligacao.solicitante }}</td>
        <td>
          {{ ligacao.solicitado }}
          <span v-if="ligacao.urgente">URGENTE!!!</span>
          <span v-else>(de boas)</span>
        </td>
        <td>
          <ac-loading v-show="isLoading[ligacao.id]" />

          <template v-if="!isLoading[ligacao.id]">
            <ac-button @click.native="editar(indice)" type="primary" icon="fa-edit"></ac-button>
            <ac-button @click.native="excluir(indice)" type="secondary" icon="fa-trash"></ac-button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['ligacoes', 'isLoading'],
  methods: {
    excluir(indice) {
      this.$emit('excluir', indice);
    },
    editar(indice) {
      this.$emit('editar', indice);
    },
  },
};
</script>

<style>
</style>
