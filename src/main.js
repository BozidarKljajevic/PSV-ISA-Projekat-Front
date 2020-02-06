import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = "http://localhost:8080"

axios.interceptors.request.use(config => {
  config.headers['Authorization'] = "Bearer " + localStorage.getItem("jwt");
  return config;
})



Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB3SIZKbA5vHANPMu1wZCc-U8PhWjRiDkY",
    libraries: "places" // necessary for places input
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
