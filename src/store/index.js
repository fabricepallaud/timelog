import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {
    today: new Date(),
    thisWeek: moment().startOf('isoWeek'),
    userId: ''
  },
  mutations: {
    newRowFormActive(state, payload) {
      this.state.newRowFormActive = payload;
    },
    setUserId(state, payload) {
      this.state.userId = payload;
    },
  }
});