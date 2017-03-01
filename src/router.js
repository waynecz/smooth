import Router from 'vue-router'
import Vue from 'vue'
import App from './components/appFrame.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            component: App,
        }
    ],
});

export default router