<template>
  <div class="datatable-container">
    <div class="datatable-header b-b-2" v-if="!!$slots['#header']">
      <slot name="#header" class="datatable-header">
      </slot>
    </div>
    <div
      v-if="!!$slots['#filters']"
      class="datatable-filters">
      <slot name="#filters" class="datatable-filters">
      </slot>
    </div>
    <div v-if="list.totalElements" class="text-right pt-1 pb-1 pr-2">
      <!--        <small>{{ $t('datatable.page') }}: {{ page }}/{{ totalPages }}</small>,-->
      <small>{{ $t('datatable.total_items') }}: {{ list.totalElements }}</small>
    </div>
    <CPagination
      class="datatable-pagination datatable-pagination-top"
      v-show="list.totalPages > 1"
      :activePage="list.page"
      :pages="list.totalPages"
      @update:activePage="onPageChange"
    />
    <CDataTable
      :fields="fields"
      :items="list.items"
      :pagination="false"
      :sorter="{external: true, resetable: false}"
      :loading="loading"
      :header="header"
    >
      <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </CDataTable>
    <hr v-show="list.totalPages > 1" />
    <CPagination
      class="datatable-pagination"
      v-show="list.totalPages > 1"
      :activePage="list.page"
      :pages="list.totalPages"
      @update:activePage="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { ListData } from '../store'

export default {
  name: 'ApiList',
  components: {},
  props: {
    fields: Array,
    header: {
      type: Boolean,
      default: false
    },
    list: ListData,
    loading: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.onQueryChange()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.list.scrollPosition.y = window.scrollY
    },
    onPageChange (newPage: number) {
      this.$router.push({
        query: { ...this.$route.query, ...{ page: newPage } }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    },
    onQueryChange () {
      this.$emit('queryChange')
      if (this.list.queryDiffers(this.$route.query) || this.list.items.length === 0) {
        this.$emit('loadItems')
      }
      if (this.$route.query.scrollY !== undefined) {
        const scrollY = this.$route.query.scrollY
        this.$router.replace({ query: { ...this.$route.query, ...{ scrollY: undefined } } })

        this.$nextTick(() => {
          window.scrollTo(0, scrollY)
        })
      }
    }
  },
  watch: {
    '$route.query' () {
      this.onQueryChange()
    }
  }
}
</script>

<style scoped>

</style>
