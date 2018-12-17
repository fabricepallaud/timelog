import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {
    thisWeek: moment().startOf('isoWeek'),
    userId: ''
  },
  mutations: {
    setUserId(state, payload) {
      this.state.userId = payload;
    },
  }
});