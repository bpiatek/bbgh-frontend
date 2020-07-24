import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'

Vue.use(CoreuiVue)

Vue.config.productionTip = false

export default {
  createVue () {
    new Vue({
      router,
      store,
      icons,
      render: h => h(App)
    }).$mount('#app')
  }
}
