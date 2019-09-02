import Vue from 'vue'
import Vuex from 'vuex'
import modal from './modules/modal'
import time from './modules/time'
import auth from './modules/auth'
// import products from './modules/products'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    modal,
    time,
    auth
  },
  strict: debug,
})