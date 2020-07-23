import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

interface State {
  sidebarShow: string|boolean;
  sidebarMinimize: boolean;
}

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop (state: State) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state: State) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  setSidebarMinimize (state: State, value: boolean) {
    state.sidebarMinimize = value
  },
  setSidebarShow  (state: State, value: boolean|string) {
    state.sidebarShow = value
  }
}

export default new Vuex.Store({
  state,
  mutations
})
