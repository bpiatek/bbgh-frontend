<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <h3>Articles</h3>
        </CCardHeader>
        <CCardBody>
          <ApiDataTable
            :items="items"
            :fields="fields"
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="loading"
            use-query
            :table-filter="{placeholder: 'Search...' }"
            :default-sort="{column: 'creationDate', asc: false }"
            @update="loadArticles"
          >
            <template #url="{item}">
              <td>
                <a :href="item.url">click</a>
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
                >Show</CButton>
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
        { key: 'id', _style: 'width:75px' },
        { key: 'url', _style: 'width:75px', sorter: false },
        { key: 'title', _style: 'min-width:100px;' },
        { key: 'comments', _classes: 'text-right' },
        { key: 'positive', _classes: 'text-success text-right' },
        { key: 'neutral', _classes: 'text-info text-right' },
        { key: 'negative', _classes: 'text-danger text-right' },
        { key: 'notOpinion', _classes: 'text-right' },
        { key: 'notChecked', _classes: 'text-right' },
        { key: 'creationDate', _style: 'width:100px; white-space: nowrap;' },
        {
          key: 'actions',
          label: 'Actions',
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
    loadArticles ({ pagination, sorts, tableFilter }: {pagination: Pagination; sorts: Sort[]; tableFilter: string}) {
      this.loading = true
      api.articles.articles(pagination, sorts, tableFilter).then((r) => {
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
