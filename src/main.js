/* Vue */
import Vue from 'vue';

/* Vuetify */
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

/* VueX */
import store from './store';

/* Router */
import router from './router';

/* Moment */
var moment = require('moment');
moment().format();

/* Firebase */
import firebase from './firebase';

/* Main Vue instance */
let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      components: {
        UserStatus
      },
      data: {
        isLoading: true
      }
    })
  }
});

/* Components */
import UserStatus from './components/UserStatus.vue';