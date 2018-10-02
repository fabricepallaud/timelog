import Vue from 'vue';
import Home from '../components/Home.vue';
import SignUp from '../components/SignUp.vue';
import Login from '../components/Login.vue';

import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: 'signup',
    component: SignUp
  },
  ]
});
