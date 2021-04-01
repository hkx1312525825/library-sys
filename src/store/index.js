import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorization: ''
  },
  mutations: {
    setauthorization: (state, data) => {
      state.authorization = data
    }
  },
  actions: {
  },
  modules: {
  }
})
