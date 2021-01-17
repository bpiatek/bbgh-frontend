import Vue from 'vue'
import Vuex from 'vuex'
import { Alert } from '@/model/alert'
import { ArticlesView, MentionsView, PlayersView } from '@/model/view'

Vue.use(Vuex)

type State = {
  alerts: Alert[];
  mobile: boolean;
  mentionsView: MentionsView;
  articlesView: ArticlesView;
  playersView: PlayersView;
}

const state = {
  alerts: [] as Alert[],
  mobile: true,
  mentionsView: new MentionsView(),
  articlesView: new ArticlesView(),
  playersView: new PlayersView()
}

const mutations = {
  addAlert (state: State, alert: Alert) {
    state.alerts.push(alert)
    setTimeout(function () {
      state.alerts = state.alerts.filter((a: Alert) => a !== alert)
    }, alert.timeout)
  },
  setMobile (state: State, value: boolean) {
    state.mobile = value
  }
}

export default new Vuex.Store({
  state,
  mutations
})
