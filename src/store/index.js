import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 持久保存的插件
import VuexPersistence from 'vuex-persist'
// 持久保存的配置
const vuexLocal = new VuexPersistence({
  key:"yx_vuex",
  storage: window.localStorage //你要吧他保存到哪里
})


export default new Vuex.Store({
  state: {
    // 历史记录
    historyList:[],
  },
  mutations: {
    addHistory(state,keyword) {
      console.log(keyword)
      if(keyword == "") {
        return false
      }
      if(state.historyList.length >= 8) {
        state.historyList.pop()
      }
      state.historyList.unshift(keyword)
    },

    del(state) {
      state.historyList = []
    },
  },
  actions: {
  },
  modules: {
  },

  plugins:[vuexLocal.plugin], //配置持久化的插件
})
