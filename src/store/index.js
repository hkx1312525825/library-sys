import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.token || '',
    currentManager: {},
    currentUser: {}
  },
  mutations: {
    setToken: (state, data) => {
      sessionStorage.token = state.token = data
    },
    setManager: (state, data) => {
      state.currentManager = data
    },
    setUser: (state, data) => {
      state.currentUser = data
    }
  },
  actions: {
  },
  modules: {
  }
})
