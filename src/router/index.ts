import Vue from 'vue'
import Router from 'vue-router'

import TheContainer from '@/containers/TheContainer.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(Router)

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
