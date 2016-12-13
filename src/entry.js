import Vue from 'vue'
import Element from 'element-ui'
import axios from 'axios'
import Cookies from 'js-cookie'
import 'babel-polyfill'

import '../public/css/style-output.css'

import Router from 'vue-router';

import appFrame from './components/appFrame.vue'

Vue.use(Element);
Vue.use(Router);
window.axios   = axios;
window.Cookies = Cookies;

const router = new Router({
	routes: [
		{
			path: '',
			component: appFrame,
			children: []

		},
		{
			path: '*',
			redirect: '/user/signin'
		}
	],
	linkActiveClass: 'active'
});

const app = new Vue({
	router
}).$mount('#app');

if (environment === 'dev') {
	Vue.config.devtools = true;
}

// 热重载配置
if (module.hot) {
	module.hot.accept();
}
