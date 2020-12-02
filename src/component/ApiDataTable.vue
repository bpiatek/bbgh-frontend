<template>
  <div class="datatable-container">
    <div class="datatable-header pt-3 b-b-2">
      <slot name="#header" class="datatable-header">
      </slot>
    </div>
    <div class="datatable-filters p-2 b-b-2">
      <slot name="#filters" class="datatable-filters">
      </slot>
    </div>
    <div v-if="totalElements" class="text-right pt-1 pb-1 pr-2"><small>{{ $t('datatable.total_items') }}: {{ totalElements }}</small></div>
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
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    useQuery: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
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
      this.$emit('update', { pagination, sorts })
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
    },
    updateRouteQuery () {
      if (!this.useQuery) {
        return
      }
      this.$router.push({
        query: {
          page: this.page.toString(),
          sort: this.sort.column ? (this.sort.column + ',' + (this.sort.asc ? 'asc' : 'desc')) : undefined
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
