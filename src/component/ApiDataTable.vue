<template>
  <div>
    <slot name="#header">
    </slot>
    <CDataTable
      :fields="fields"
      :items="items"
      :pagination="false"
      :sorter="{external: true, resetable: true}"
      @update:sorter-value="updateSort"
    >
      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </CDataTable>
    <CPagination
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
    size: {
      default: 20,
      type: Number
    },
    useQuery: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    this.loadRouteQuery()
    this.loadData()
  },
  methods: {
    loadData () {
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = this.sort.column ? [new Sort(this.sort.column, this.sort.asc ? SortDirection.asc : SortDirection.desc)] : []
      this.$emit('update', { pagination, sorts })
    },
    updateSort ({ column, asc }: {column: string; asc: boolean}) {
      this.sort.column = column
      this.sort.asc = asc
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
        this.sort.column = sort.name
        this.sort.asc = sort.direction === SortDirection.asc
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
      })
    }
  }
}
</script>

<style scoped>

</style>
