// Vue
import Vue from 'vue';

// Vuetify
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

// VueX
import store from './store';

// Router
import router from './router';

// Moment
var moment = require('moment');
moment().format();

// Moment duration plugin
// require("moment-duration-format");

// Firebase
import firebase from './firebase';

// Main Vue instance
import App from './App.vue';
let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      store,
      router,
      data: {
        isLoading: true
      },
      render: h => h(App)
    }).$mount('#app')
  }
});

// Toasted
import Toasted from 'vue-toasted';
Vue.use(Toasted)

// Components
import UserStatus from './components/UserStatus.vue';