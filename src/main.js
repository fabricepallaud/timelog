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
import firebase from './firebase';

/* Main app */
new Vue({
  el: '#app',
  store,
  router
})
