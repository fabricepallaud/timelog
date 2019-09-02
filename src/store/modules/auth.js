const state = {
  userId: ''
}

const mutations = {
  setUserId (state, payload) {
    this.state.userId = payload;
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
