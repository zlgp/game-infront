import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import request from "../until/request"
Vue.prototype.$http = request;
Vue.use(request)
import sign from '../until/getSign'
Vue.prototype.$sign = sign

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
