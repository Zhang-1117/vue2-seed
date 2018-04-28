// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import _ from 'lodash'

window._ = _;
window.Vue = Vue;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.prototype.$comp = {}; // App Level Components

Vue.prototype.$http.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  return config;
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.$http.interceptors.response.use((response) => {
  return response;
}, error => {
  if (error.response.status >= 400) {
    console.error(error.response.data.message);
  }
  return Promise.reject(error.response);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
