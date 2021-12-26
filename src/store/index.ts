import Vue from 'vue'
import Vuex from 'vuex'
import { Alert } from '@/model/alert'
import { ArticlesView, CommentsView, MentionsView, PlayersView } from '@/model/view'
import { ContextMenuSettings } from '@/model/contextMenu'

Vue.use(Vuex)

type State = {
  alerts: Alert[];
  mobile: boolean;
  mentionsView: MentionsView;
  articlesView: ArticlesView;
  playersView: PlayersView;
  contextMenu: ContextMenuSettings;
}

const state = {
  alerts: [] as Alert[],
  mobile: true,
  mentionsView: new MentionsView(),
  articlesView: new ArticlesView(),
  commentsView: new CommentsView(),
  playersView: new PlayersView(),
  contextMenu: {
    options: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
    handler: ($event) => {},
    event: undefined
  }
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
  },
  showContextMenu (state: State, contextMenuSettings: ContextMenuSettings) {
    state.contextMenu = contextMenuSettings
  }
}

export default new Vuex.Store({
  state,
  mutations
})
