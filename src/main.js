/* Vue */
import Vue from 'vue';

/* VueX */
import store from './store';

/* Router */
import router from './router';

/* Moment */
var moment = require('moment');
moment().format();

/* Firebase */
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCKLzwVpBjFBNZIkOnofKvpQ3OKTUuTUas",
  authDomain: "timelog-bd174.firebaseapp.com",
  databaseURL: "https://timelog-bd174.firebaseio.com",
  projectId: "timelog-bd174",
  storageBucket: "timelog-bd174.appspot.com",
  messagingSenderId: "860828723339"
};

firebase.initializeApp(config);
let app;

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      components: {
        UserStatus
      }
    })
  }
});

/* Main app */
/*
new Vue({
  el: '#app',
  store,
  router,
  components: {
    UserStatus
  }
})
*/

/* Components */
import UserStatus from './components/UserStatus.vue';