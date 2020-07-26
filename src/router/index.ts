import Vue from 'vue'
import Router from 'vue-router'

import TheContainer from '@/containers/TheContainer.vue'
import Dashboard from '@/views/Dashboard.vue'

import Articles from '@/views/articles/Articles.vue'

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
        },
        {
          path: 'articles',
          meta: {
            label: 'Articles'
          },
          component: {
            render (c: any) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Articles',
              component: Articles
            }
          ]
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
