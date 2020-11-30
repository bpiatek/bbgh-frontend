import Vue from 'vue'
import Router from 'vue-router'
import TheContainer from '@/containers/TheContainer.vue'
import Articles from '@/views/articles/Articles.vue'
import Article from '@/views/articles/Article.vue'
import Mentions from '@/views/mentions/Mentions.vue'
import i18n from '../i18n'

Vue.use(Router)

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/mentions',
      name: 'Home',
      meta: {
        label: i18n.tc('Home')
      },
      component: TheContainer,
      children: [
        {
          path: 'articles',
          meta: {
            label: i18n.tc('Articles')
          },
          component: {
            render (c: (s: string) => unknown) {
              return c('router-view')
            }
          },
          children: [
            {
              path: '',
              name: i18n.tc('Articles'),
              component: Articles
            },
            {
              path: ':id',
              meta: {
                label: i18n.tc('Article Details')
              },
              name: 'Article',
              component: Article
            }
          ]
        },
        {
          path: 'mentions',
          name: 'Mentions',
          component: Mentions,
          meta: {
            label: i18n.tc('Mentions')
          }
        }

      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
