import Vue from 'vue'
import router from './router'
import smooth from './plugins'

Vue.use(smooth);

const app = new Vue({
  router
}).$mount('#app');

if (ENV === 'development') {
  Vue.config.devtools = true;
}

// 热重载配置
if (module.hot) {
  module.hot.accept();
}
