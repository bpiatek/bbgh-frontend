<template>
  <div>
    <slot name="#header">
    </slot>
    <div v-if="totalElements" class="text-right mb-2">Total items: {{ totalElements }}</div>
    <form @submit.prevent="tableFilterChange" v-if="tableFilter">
      <div class="api-data-table-filter">
        <VueSimpleSuggest
          ref="tableFilter"
          :list="tableFilterSettings.suggestions"
          :filter-by-query="false"
          :placeholder="tableFilterSettings.placeholder"
          :min-length="0"
          :controls="{autocomplete: []}"
          @select="tableFilterChange"
          @input="tableFilterValue = $event"
          @hide-list="tableFilterChange"
        >
          <div slot="suggestion-item" slot-scope="{ suggestion }" class="overflow-auto">
            <span class="float-left mt-1">{{ suggestion }}</span>
<!--            TODO fix removing-->
<!--            <button @click.stop="removeTableFilterSuggestion(suggestion)" class="float-right btn btn-sm btn-ghost-secondary">-->
<!--              <CIcon name="cilX"/>-->
<!--            </button>-->
          </div>
        </VueSimpleSuggest>
      </div>
    </form>
    <CDataTable
      :fields="fields"
      :items="items"
      :pagination="false"
      :sorter="{external: true, resetable: false}"
      :loading="loading"
      :sorter-value="sort"
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
import 'vue-simple-suggest/dist/styles.css'
// import VueSimpleSuggest from 'vue-simple-suggest/lib/vue-simple-suggest.vue' // Optional CSS
// eslint-disable-next-line @typescript-eslint/no-var-requires
const VueSimpleSuggest = require('vue-simple-suggest/dist/cjs')

export default {
  name: 'ApiDataTable',
  components: { VueSimpleSuggest: VueSimpleSuggest },
  data () {
    return {
      page: 1,
      sort: {
        column: null as null | string,
        asc: false as boolean
      },
      tableFilterValue: null,
      tableFilterSettings: {
        placeholder: 'Search...',
        suggestions: []
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
    },
    removeTableFilterSuggestion (suggestion: unknown) {
      // eslint-disable-next-line eqeqeq
      const index = this.tableFilterSettings.suggestions.indexOf(suggestion)
      console.log(index, this.tableFilterSettings.suggestions)
      if (index > -1) {
        this.tableFilterSettings.suggestions.splice(index, 1)
      }
    }
  },
  watch: {
    // eslint-disable-next-line
      tableFilter: function (val: boolean | any) {
      if (val.placeholder) {
        this.tableFilterSettings.placeholder = val.placeholder
      }
      if (val.suggestions) {
        this.tableFilterSettings.suggestions = this.tableFilterSettings.suggestions.splice(0, 0).concat(val.suggestions)
      }
    }
  }
}
</script>

<style scoped>

</style>
