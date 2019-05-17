import Vue from 'vue';
import store from './store';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Project from './views/Project.vue';
import Projects from './views/Projects.vue';
import { EventBus } from './components/event-bus.js';
import firebase from 'firebase';
import moment from 'moment';

import Router from 'vue-router';
Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/home',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/week/:year/:month/:day',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {  
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  }
  else {
    if (to.params.year && to.params.month && to.params.day) {

      // Make ProjectRow component instances update their own data
      EventBus.$emit('changeWeek', store.state.currentWeek);

      // Update current week in store for week navigation buttons 
      const currentWeek = to.params.year + to.params.month + to.params.day;
      store.commit('setCurrentWeek', moment(currentWeek));
    }
    else {

      // Make ProjectRow component instances update their own data
      EventBus.$emit('changeWeek', store.state.thisWeek);
    }
    next();
  }
})

export default router
