import Vue from 'vue'
import Router from 'vue-router'

import TheContainer from '@/containers/TheContainer.vue'
import Dashboard from '@/views/Dashboard.vue'

import Articles from '@/views/articles/Articles.vue'
import Article from '@/views/articles/Article.vue'
import Mentions from '@/views/mentions/Mentions.vue'

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
            render (c: (s: string) => unknown) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Articles',
              component: Articles
            },
            {
              path: ':id',
              meta: {
                label: 'Article Details'
              },
              name: 'Article',
              component: Article
            }
          ]
        },
        {
          path: 'mentions',
          meta: {
            label: 'Mentions'
          },
          component: {
            render (c: (s: string) => unknown) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: 'Mentions',
              component: Mentions
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
