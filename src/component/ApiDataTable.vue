<template>
  <div class="datatable-container">
    <div class="datatable-header">
      <slot name="#header" class="datatable-header">
      </slot>
    </div>
    <div v-if="totalElements" class="text-right mb-2">{{ $t('datatable.total_items') }}: {{ totalElements }}</div>
    <form @submit.prevent="tableFilterChange" v-if="tableFilter">
      <div class="api-data-table-filter">
      </div>
    </form>
    <CDataTable
      :fields="fields"
      :items="items"
      :pagination="false"
      :sorter="{external: true, resetable: false}"
      :loading="loading"
      :sorter-value="sort"
      :header="header"
      @update:sorter-value="updateSort"
    >
      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </CDataTable>
    <hr v-show="totalPages > 1" />
    <CPagination
      class="datatable-pagination"
      v-show="totalPages > 1"
      :activePage="page"
      :pages="totalPages"
      @update:activePage="pageChange"
    />
  </div>
</template>

<script lang="ts">
import { Pagination, Sort, SortDirection } from '@/api/model/common'

export default {
  name: 'ApiDataTable',
  components: {},
  data () {
    return {
      page: 1,
      sort: {
        column: null as null | string,
        asc: false as boolean
      },
      tableFilterValue: null,
      tableFilterSettings: {
        placeholder: 'Search...'
      }
    }
  },
  props: {
    items: Array,
    fields: Array,
    totalPages: {
      default: 0,
      type: Number
    },
    totalElements: {
      type: Number
    },
    size: {
      default: 20,
      type: Number
    },
    useQuery: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    tableFilter: {
      default: false
    },
    header: {
      default: true
    },
    defaultSort: {
      type: Object,
      default: () => {
        return {
          column: null,
          asc: true
        }
      }
    }
  },
  mounted () {
    this.sort = {
      column: this.defaultSort.column,
      asc: this.defaultSort.sort
    }
    this.loadRouteQuery()
    this.loadData()
  },
  methods: {
    loadData () {
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = this.sort.column ? [new Sort(this.sort.column, this.sort.asc ? SortDirection.asc : SortDirection.desc)] : []
      const tableFilter = this.tableFilterValue
      this.$emit('update', { pagination, sorts, tableFilter })
    },
    updateSort ({ column, asc }: { column: string; asc: boolean }) {
      this.sort = {
        column: column,
        asc: asc
      }
      this.loadData()
      this.updateRouteQuery()
    },
    pageChange (pageNumber: number) {
      this.page = pageNumber
      this.loadData()
      this.updateRouteQuery()
    },
    tableFilterChange (val: string | unknown) {
      if (typeof val === 'string') {
        this.tableFilterValue = val
      }
      this.updateRouteQuery()
      this.loadData()
    },
    loadRouteQuery () {
      if (!this.useQuery) {
        return
      }
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
      const sort = this.$route.query.sort ? Sort.fromString(this.$route.query.sort) : null
      if (sort) {
        this.sort = {
          column: sort.name,
          asc: sort.direction === SortDirection.asc
        }
      }
      this.tableFilterValue = this.$route.query.tableFilter
    },
    updateRouteQuery () {
      if (!this.useQuery) {
        return
      }
      this.$router.push({
        query: {
          page: this.page.toString(),
          sort: this.sort.column ? (this.sort.column + ',' + (this.sort.asc ? 'asc' : 'desc')) : undefined,
          tableFilter: this.tableFilterValue
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
