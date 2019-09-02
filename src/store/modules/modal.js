const state = {
  dialog: false
}

const mutations = {
  setDialogState (state, payload) {
    state.dialog = payload;
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
