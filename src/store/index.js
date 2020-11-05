import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: false,
    uerInfo: {
      token: ""
    },
  },
  mutations: {
    login(state, provider) {
      state.hasLogin = true
      state.uerInfo.token = provider.token
     localStorage.setItem("uerInfo",JSON.stringify(provider))
    },
    logout(state) {
      state.hasLogin = false
      state.uerInfo = {}
      localStorage.removeItem("uerInfo")
    }
  },
  actions: {
  },
  modules: {
  }
})
