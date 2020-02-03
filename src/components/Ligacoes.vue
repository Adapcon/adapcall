<template>
  <table>
    <tr>
      <th>ID</th>
      <th>Solicitante</th>
      <th>Solicitado</th>
    </tr>
    <tr v-show="isLoading">
      <td colspan="4">
        Carregando...
      </td>
    </tr>
    <tr v-show="!isLoading && ligacoes.length === 0">
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
        <button @click="editar(indice)">Editar</button>
        <button @click="excluir(indice)">Excluir</button>
      </td>
    </tr>
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
