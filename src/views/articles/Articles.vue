<template>
  <CCard class="main-card">
    <CCardBody class="pt-0">
      <ApiDataTable
        :items="$store.state.articlesList.items"
        :fields="fields"
        :total-pages="$store.state.articlesList.totalPages"
        :total-elements="$store.state.articlesList.totalElements"
        :loading="loading"
        :header="!$store.state.mobile"
        :page="$store.state.articlesList.page"
        @pageChange="onPageChange"
        class="articles"
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
            {{ dayjs(item.creationDate).format('YYYY-MM-DD HH:mm:ss') }}
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
              <i class="text-nowrap">{{  dayjs(item.creationDate).format('YYYY-MM-DD HH:mm:ss')  }}</i>
              <span class="text-nowrap pl-2">
                <a :href="item.url">90minut.pl</a>
              </span>
            </div>
          </td>
        </template>
      </ApiDataTable>
    </CCardBody>
  </CCard>
</template>

<script lang="ts">
import ApiDataTable from '@/component/ApiDataTable.vue'
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'
import { Article } from '@/api/model/Article'
import { ListData } from '@/store'

export default {
  name: 'Articles',
  components: { ApiDataTable },
  data () {
    return {
      items: [] as Article[],
      fields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('articles.list.id') },
        { key: 'url', _style: 'width:75px', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', _style: 'min-width:200px;', sorter: false, label: this.$t('articles.list.title') },
        { key: 'creationDate', _style: 'width: 1%; white-space: nowrap;', sorter: false, label: this.$t('articles.list.creationDate') }
      ],
      page: 1,
      totalPages: 1,
      totalElements: 0,
      loading: false
    }
  },
  activated () {
    if (this.$store.state.articlesList.page === 0) {
      this.loadParamsFromQuery()
      this.loadItems()
    } else {
      this.saveStateToQuery()
    }
    window.scrollTo(0, 0)
  },
  methods: {
    loadItems () {
      this.loading = true
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = [new Sort('creationDate', SortDirection.desc)]
      api.articles.articles(pagination, sorts).then((r) => {
        const listData = new ListData<Article>()
        listData.items = r.data.content
        listData.totalPages = r.data.totalPages
        listData.totalElements = r.data.totalElements
        listData.page = this.page
        this.$store.commit('setArticlesList', listData)
        this.loading = false
        this.saveStateToQuery()
      })
    },
    onPageChange (newPage: number) {
      this.page = newPage
      window.scrollTo(0, 0)
      this.loadItems()
    },
    saveStateToQuery () {
      this.$router.push({
        query: {
          page: this.page.toString()
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    },
    loadParamsFromQuery () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    }
  }
}
</script>

<style scoped>

</style>
