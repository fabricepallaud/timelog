import Vue from 'vue';
import Home from '../components/Home.vue';
import SignUp from '../components/SignUp.vue';
import Login from '../components/Login.vue';

import Router from 'vue-router';
Vue.use(Router);

/*
Router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})
*/

export default new Router({
  routes: [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: SignUp
  },
  ]
});