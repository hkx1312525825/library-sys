import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token || '',
    currentManager: {}
  },
  mutations: {
    setToken: (state, data) => {
      localStorage.token = state.token = data
    },
    setManager: (state, data) => {
      state.currentManager = data
    }
  },
  actions: {
  },
  modules: {
  }
})
