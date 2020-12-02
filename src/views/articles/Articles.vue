<template>
  <CCard class="main-card">
    <CCardBody class="pt-0">
      <ApiDataTable
        class="articles"
        :items="items"
        :fields="fields"
        :total-pages="totalPages"
        :total-elements="totalElements"
        :loading="loading"
        use-query
        :header="!$store.state.mobile"
        :default-sort="{column: 'creationDate', asc: false }"
        @update="loadArticles"
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
import { Pagination, Sort } from '@/api/model/common'
import api from '@/api/api'
import { Article } from '@/api/model/Article'

export default {
  name: 'Articles',
  components: { ApiDataTable },
  data () {
    return {
      items: [] as Article[],
      fields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'id', _style: 'width:75px', label: this.$t('articles.list.id') },
        { key: 'url', _style: 'width:75px', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', _style: 'min-width:200px;', label: this.$t('articles.list.title') },
        { key: 'creationDate', _style: 'width: 1%; white-space: nowrap;', label: this.$t('articles.list.creationDate') }
      ],
      totalPages: 1,
      totalElements: 0,
      loading: false
    }
  },
  methods: {
    loadArticles ({ pagination, sorts }: {pagination: Pagination; sorts: Sort[]}) {
      this.loading = true
      api.articles.articles(pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
        this.totalElements = r.data.totalElements
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
