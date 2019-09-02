var moment = require('moment');

const state = {
  thisWeek: moment().startOf('isoWeek'),
  currentWeek: moment().startOf('isoWeek'),
  TasksHavingRows: []
}

const mutations = {
  setCurrentWeek(state, payload) {
    state.currentWeek = payload;
  },
  setTasksHavingRows(state, payload) {
    state.TasksHavingRows.push(payload);
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
