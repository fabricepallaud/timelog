import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var moment = require('moment');

export default new Vuex.Store({
  state: {
    thisWeek: moment().startOf('isoWeek'),
    currentWeek: moment().startOf('isoWeek'),
    userId: '',
    TasksHavingRows: []
  },
  mutations: {
    setUserId(state, payload) {
      this.state.userId = payload;
    },
    setCurrentWeek(state, payload) {
      this.state.currentWeek = payload;
    },
    setTasksHavingRows(state, payload) {
      this.state.TasksHavingRows.push(payload);
    }
  }
});