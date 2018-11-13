import Vue from 'vue';
import Vuex from 'vuex';
import {db} from '../firebase';
Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {
    today: new Date(),
    thisWeek: moment().startOf('isoWeek'),
    currentWeek: moment().startOf('isoWeek'),
  },
  mutations: {
    nextWeek() {
      this.state.currentWeek = moment(this.state.currentWeek).add(7, 'days').format('DD MMM');
    },
    previousWeek() {
      this.state.currentWeek = moment(this.state.currentWeek).subtract(7, 'days').format('DD MMM');
    },
    thisWeek() {
      this.state.currentWeek = moment(this.state.thisWeek).format('DD MMM');
    },
    newRowFormActive(state, payload) {
      this.state.newRowFormActive = payload;
    },
  },
  actions: {
    addProject() {
      db.collection('project').add({
        Name: 'Default project name',
        Description: 'Default project decription'
      })
      .then(function(docRef) {
      })
      .catch(function(error) {
      });
    }
  }
});