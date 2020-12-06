import Vue from 'vue'
import Vuex from 'vuex'
import { Mention } from '@/api/model/Mention'
import { Article } from '@/api/model/Article'
Vue.use(Vuex)

export class ListData<T> {
  items: T[] = []
  page = 1
  size = 20
  totalPages = 1
  totalElements = 0
  scrollPosition = { x: 0, y: 0 }
  toQueryParameters (): {[k: string]: string|undefined} {
    return {
      page: this.page.toString()
    }
  }

  queryDiffers (query: {[k: string]: string|number|undefined}): boolean {
    const thisQuery = this.toQueryParameters()
    for (const key of Object.keys(thisQuery)) {
      if (thisQuery[key] !== query[key]) {
        return true
      }
    }
    return false
  }
}

export class MentionsList extends ListData<Mention> {
  filterSentiment = []
  toQueryParameters (): {[k: string]: any} {
    const result = super.toQueryParameters()
    if (this.filterSentiment.length > 0) {
      result.sentiments = this.filterSentiment.join(',')
    } else {
      result.sentiments = undefined
    }
    return result
  }
}

type State = {
  alerts: Alert[];
  mobile: boolean;
  mentionsList: MentionsList;
  articlesList: ListData<Article>;
}

const state = {
  alerts: [] as Alert[],
  mobile: true,
  mentionsList: new MentionsList(),
  articlesList: new ListData<Article>()
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
  setMentionsList (state: State, list: MentionsList) {
    state.mentionsList = list
  },
  setArticlesList (state: State, list: ListData<Article>) {
    state.articlesList = list
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
