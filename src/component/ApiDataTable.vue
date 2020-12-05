<template>
  <div class="datatable-container">
    <div class="datatable-header b-b-2" v-if="!!$slots['#header']">
      <slot name="#header" class="datatable-header">
      </slot>
    </div>
    <div
      v-if="!!$slots['#filters']"
      class="datatable-filters p-2 b-b-2">
      <slot name="#filters" class="datatable-filters">
      </slot>
    </div>
<!--    <div v-if="totalElements" class="text-right pt-1 pb-1 pr-2">-->
<!--      <small>{{ $t('datatable.page') }}: {{ page }}/{{ totalPages }}</small>,-->
<!--      <small>{{ $t('datatable.total_items') }}: {{ totalElements }}</small>-->
<!--    </div>-->
    <CPagination
      class="datatable-pagination datatable-pagination-top"
      v-show="totalPages > 1"
      :activePage="page"
      :pages="totalPages"
      @update:activePage="$emit('pageChange', $event)"
    />
    <CDataTable
      :fields="fields"
      :items="items"
      :pagination="false"
      :sorter="{external: true, resetable: false}"
      :loading="loading"
      :sorter-value="sort"
      :header="header"
      @update:sorter-value="$emit('sortChange', $event)"
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
      @update:activePage="$emit('pageChange', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Pagination, Sort, SortDirection } from '@/api/model/common'

export default {
  name: 'ApiDataTable',
  components: {},
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
    page: {
      type: Number,
      default: 1
    },
    sort: {
      type: Object,
      default: () => {
        return {
          column: null as null | string,
          asc: false as boolean
        }
      }
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      default: false,
      type: Boolean
    },
    header: {
      default: true
    }
  },
  // created () {
  //   this.sort = {
  //     column: this.defaultSort.column,
  //     asc: this.defaultSort.sort
  //   }
  //   // this.loadRouteQuery()
  //   // this.loadData()
  // },
  methods: {
    loadData () {
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = this.sort.column ? [new Sort(this.sort.column, this.sort.asc ? SortDirection.asc : SortDirection.desc)] : []
      this.$emit('update', { pagination, sorts })
    },
    updateSort ({ column, asc }: { column: string; asc: boolean }) {
      this.$emit('sortChange', {
        column: column,
        asc: asc
      })
    },
    // pageChange (pageNumber: number) {
    // this.page = pageNumber
    // this.loadData()
    // this.updateRouteQuery()
    // },
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
