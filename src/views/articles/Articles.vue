<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard class="card-border-round">
        <CCardBody>
          <ApiDataTable
            :items="items"
            :fields="fields"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="loading"
            use-query
            :default-sort="{column: 'creationDate', asc: false }"
            @update="loadArticles"
          >
            <slot slot="#header">
              <h3>{{ $t('articles.list_header') }}</h3>
            </slot>
            <template #url="{item}">
              <td>
                <a :href="item.url">link</a>
              </td>
            </template>
            <template #title="{item}">
              <td>
                <p
                  style="cursor: pointer"
                  @click="$router.push({name: 'Article', params: {id: item.id}})"
                >
                  {{ item.title }}
                </p>
              </td>
            </template>
            <template #creationDate="{item}">
              <td class="text-nowrap text-xl-right">
                {{ dayjs(item.creationDate).format('YYYY-MM-DD HH:mm:ss') }}
              </td>
            </template>
            <template #actions="{item}">
              <td>
                <CButton
                  @click.prevent="$router.push({name: 'Article', params: { id: item.id } })"
                  color="info"
                  variant="outline"
                  size="sm"
                >{{ $t('datatable.action.show_details') }}</CButton>
              </td>
            </template>
          </ApiDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
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
      fields: [
        { key: 'id', _style: 'width:75px', label: this.$t('articles.list.id') },
        { key: 'url', _style: 'width:75px', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', _style: 'min-width:200px;', label: this.$t('articles.list.title') },
        { key: 'creationDate', _style: 'width: 1%; white-space: nowrap;', label: this.$t('articles.list.creationDate') },
        {
          key: 'actions',
          label: this.$t('datatable.actions'),
          _style: 'width:1%',
          sorter: false,
          filter: false
        }
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
