/* eslint-disable */
const importComponent = path => () => import(/* webpackChunkName: "component_" */`@/components/${path}.vue`);

export default {
  install(Vue, options) {
    Vue.component('ac-button', importComponent('Button'));
    Vue.component('ac-loading', importComponent('Loading'));
  },
};
