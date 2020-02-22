import Vue from 'vue';
import axios from 'axios';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';

import App from './App.vue';
import router from './router';
import importComponent from './plugin/importComponent';

Vue.use(importComponent);

Vue.config.productionTip = false;
global.axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
