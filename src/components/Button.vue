<template>
  <button :class="['btn', `btn-${type}`]">
    <i v-show="icon" :class="['fas fa-fw', icon]"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default',
    },
  },
};
</script>

<style>

</style>
