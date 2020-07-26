<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          Articles
        </CCardHeader>
        <CCardBody>
          <CDataTable
            :fields="fields"
            :items="items"
            :pagination="false"
            :sorter="{external: true, resetable: true}"
            @update:sorter-value="updateSort"
          >
            <template #url="{item}">
              <td>
                <a :href="item.url" target="_blank">click</a>
              </td>
            </template>
            <template #creationDate="{item}">
              <td>
                <span>{{ formatCreationDate(item.creationDate) }}</span>
              </td>
            </template>
            <template #actions="">
              <td>
              </td>
            </template>
          </CDataTable>
          <CPagination
            :activePage="page"
            :pages="totalPages"
            @update:activePage="pageChange"
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { Pagination, Sort, SortDirection } from '@/common/api/common'
import api from '@/common/api/api'
import * as moment from 'moment'

export default {
  name: 'Articles',
  data () {
    return {
      items: [],
      fields: [
        { key: 'id', _style: 'min-width:50px' },
        'url',
        { key: 'title', _style: 'min-width:100px;' },
        { key: 'creationDate', _style: 'min-width:100px; white-space: nowrap;' },
        {
          key: 'actions',
          label: 'Actions',
          _style: 'width:1%',
          sorter: false,
          filter: false
        }
      ],
      page: 1,
      size: 20,
      totalPages: 1,
      sort: {
        column: null as null | string,
        asc: false as boolean
      }
    }
  },
  mounted () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = this.sort.column ? [new Sort(this.sort.column, this.sort.asc ? SortDirection.asc : SortDirection.desc)] : []
      api.articles.articles(pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
      })
    },
    updateSort (sort) {
      this.sort.column = sort.column
      this.sort.asc = sort.asc
      this.loadArticles()
    },
    pageChange (pageNumber: number) {
      this.page = pageNumber
      this.loadArticles()
    },
    formatCreationDate (creationDate: string): string {
      return moment.default(creationDate).format('YYYY-MM-DD')
    }
  }
}
</script>

<style scoped>

</style>
