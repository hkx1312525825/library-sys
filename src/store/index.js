import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.token || '',
    currentManager: localStorage.currentManager || {}
  },
  mutations: {
    setToken: (state, data) => {
      localStorage.token = state.token = data
    },
    setManager: (state, data) => {
      localStorage.currentManager = state.currentManager = data
    }
  },
  actions: {
  },
  modules: {
  }
})
