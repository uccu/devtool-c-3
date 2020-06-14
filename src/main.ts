import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBus from 'vue-bus'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/iconfont/iconfont.css";
import "@/assets/css/m.css";

Vue.use(VueBus);
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
