import Router from 'vue-router'
import Vue from 'vue'
import App from './components/App.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            name: 'App',
            path: '/',
            component: App,
        }
    ],
});

export default router