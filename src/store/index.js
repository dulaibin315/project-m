import Vue from 'vue'
import Vuex from 'vuex'
import * as myStorage from '@/untils/getData.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    myToken: myStorage.getUser()
  },
  mutations: {
    // 修改token
    setUser (state, data) {
      // 修改state中myToken的值
      state.myToken = data
      // 修改本地存储的值
      myStorage.setUser(data)
    },
    // 删除token
    removeUser (state, data) {
      // 将state中的myToken修改为空对象
      state.myToken = {}
      // 删除本地token
      myStorage.removeUser()
    }
  },
  actions: {},
  modules: {}
})
