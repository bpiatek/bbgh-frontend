import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

type State = {
  sidebarShow: string|boolean;
  sidebarMinimize: boolean;
  alerts: Alert[];
}

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  alerts: [] as Alert[]
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
  },
  addAlert (state: State, alert: Alert) {
    state.alerts.push(alert)
    setTimeout(function () {
      state.alerts = state.alerts.filter((a: Alert) => a !== alert)
    }, alert.timeout)
  }
}

export default new Vuex.Store({
  state,
  mutations
})

export enum AlertType {
  success = 'success',
  primary = 'primary',
  warning = 'warning',
  danger = 'danger',
  info = 'info',
}

export class Alert {
  constructor (
    public type: AlertType,
    public message: string,
    public timeout: number = 10
  ) {
    this.type = type
    this.message = message
    this.timeout = timeout
  }

  static success (message: string, timeout?: number): Alert {
    return new Alert(AlertType.success, message, timeout)
  }

  static danger (message: string, timeout?: number): Alert {
    return new Alert(AlertType.danger, message, timeout)
  }

  static warning (message: string, timeout?: number): Alert {
    return new Alert(AlertType.warning, message, timeout)
  }
}
