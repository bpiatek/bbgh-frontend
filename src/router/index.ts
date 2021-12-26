import Vue from 'vue'
import Router from 'vue-router'
import TheContainer from '@/containers/TheContainer.vue'
import Articles from '@/views/articles/Articles.vue'
import Article from '@/views/articles/Article.vue'
import Player from '@/views/players/Player.vue'
import Mentions from '@/views/mentions/Mentions.vue'
import i18n from '../i18n'
import Comments from '@/views/comments/Comments.vue'

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
              name: 'Articles',
              component: Articles,
              meta: {
                label: i18n.tc('Articles')
              }
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
        },
        {
          path: 'players/:id',
          name: 'Player',
          component: Player,
          meta: {
            label: i18n.tc('Player')
          }
        },
        {
          path: 'players',
          name: 'Players',
          component: Player,
          meta: {
            label: i18n.tc('Player')
          }
        },
        {
          path: 'comments',
          name: 'Comments',
          component: Comments,
          meta: {
            label: i18n.tc('Comments')
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
  routes: configRoutes()
})
