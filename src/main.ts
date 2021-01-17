import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import CoreuiVue from '@coreui/vue'
import icons from './assets/icons/icons'
import ApiService from '@/api/ApiService'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import relativeTime from 'dayjs/plugin/relativeTime'
import i18n from './i18n'

// init env things
ApiService.init(process.env.VUE_APP_API_HOST !== undefined ? process.env.VUE_APP_API_HOST : '')

// dayjs plugins
dayjs.extend(relativeTime)
dayjs.locale('pl')

// Vue
Vue.use(CoreuiVue)

// Global mixin
Vue.mixin({
  methods: {
    dayjs (date: string): dayjs.Dayjs {
      return dayjs(date)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  icons,
  i18n,
  render: h => h(App)
}).$mount('#app')

// types
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    icons?: unknown;
  }
}
