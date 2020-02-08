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
          <div v-if="isLoading[ligacao.id]">Carregando...</div>

          <template v-if="!isLoading[ligacao.id]">
            <button @click="editar(indice)" class="btn btn-primary">Editar</button>
            <button @click="excluir(indice)" class="btn btn-primary">Excluir</button>
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
