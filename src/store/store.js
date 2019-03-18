import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    sys_username: "zhonghangAlex",
    sys_power: "1"
  },
  getters: {
    getUserNameFn(state) {
      return state.sys_username
    },
    getUserPowerFn(state) {
      return state.sys_power
    }
  },
  actions: {
    setUserName({commit, state}, name) {
      commit("setUserNameFn", name)
    }
  },
  mutations: {
    setUserNameFn(state, name) {
      state.sys_username = name
    },
    setUserPowerFn(state, power) {
      state.sys_power = power
    }

  }
})

export default store
