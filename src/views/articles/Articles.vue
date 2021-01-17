<template>
  <CCard class="main-card">
    <CCardBody class="pt-0">
      <ApiList
        :list="view.articlesList"
        :fields="fields"
        :header="!$store.state.mobile"
        @pageChange="loadItems"
        class="articles"
        top-pagination
      >
        <template #url="{item}">
          <td>
            <a :href="item.url">link</a>
          </td>
        </template>
        <template #title="{item}">
          <td>
            <router-link
              class="a-soft"
              :to="{name: 'Article', params: {id: item.id}}"
            >
              {{  item.title  }}
            </router-link>
          </td>
        </template>
        <template #creationDate="{item}">
          <td class="text-nowrap text-xl-right">
            {{ dayjs(item.creationDate).format('DD MMM YYYY HH:mm') }}
          </td>
        </template>
        <template #mobile="{item}">
          <td>
            <router-link
              class="a-soft"
              :to="{name: 'Article', params: {id: item.id}}"
            >
              {{  item.title  }}
            </router-link>
            <div class="text-nowrap pt-2 text-right">
              <i class="text-nowrap">{{  dayjs(item.creationDate).format('DD MMM YYYY HH:mm')  }}</i>
              <span class="text-nowrap pl-2">
                <a :href="item.url">90minut.pl</a>
              </span>
            </div>
          </td>
        </template>
      </ApiList>
    </CCardBody>
  </CCard>
</template>

<script lang="ts">
import ApiList from '@/component/ApiList.vue'
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'

export default {
  name: 'Articles',
  components: { ApiList },
  data () {
    return {
      view: this.$store.state.articlesView,
      fields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('articles.list.id') },
        { key: 'url', _style: 'width:75px', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', _style: 'min-width:200px;', sorter: false, label: this.$t('articles.list.title') },
        { key: 'creationDate', _style: 'width: 1%; white-space: nowrap;', sorter: false, label: this.$t('articles.list.creationDate') }
      ],
      loading: false
    }
  },
  methods: {
    loadItems () {
      const list = this.view.articlesList
      list.loading = true
      const pagination = new Pagination(this.view.articlesList.page - 1, this.view.articlesList.size)
      const sorts = [new Sort('creationDate', SortDirection.desc)]
      api.articles.articles(pagination, sorts).then((r) => {
        list.items = r.data.content
        list.totalPages = r.data.totalPages
        list.totalElements = r.data.totalElements
        list.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
