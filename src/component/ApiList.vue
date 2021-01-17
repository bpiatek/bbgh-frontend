<template>
  <div class="datatable-container">
    <div class="datatable-header pt-3" v-if="!!$scopedSlots['header']">
      <slot name="header" class="datatable-header">
      </slot>
    </div>
    <div
      v-if="!!$scopedSlots['filters']"
      class="datatable-filters">
      <slot name="filters" class="datatable-filters">
      </slot>
    </div>
    <div v-if="list.totalElements" class="text-right pt-1 pb-1 pr-2">
      <small>{{ $t('datatable.total_items') }}: {{ list.totalElements }}</small>
    </div>
    <CPagination
      v-if="topPagination"
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
      :loading="list.loading"
      :header="header"
    >
      <template #no-items-view>
        <div class="text-center">
          <h5>
            Nic nie znaleziono.
            <CIcon
              width="30"
              name="cil-ban"
              class="text-danger"
            />
          </h5>
        </div>
      </template>
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
import { List } from '@/model/list'

export default {
  name: 'ApiList',
  components: {},
  props: {
    fields: Array,
    header: {
      type: Boolean,
      default: false
    },
    list: List,
    topPagination: {
      type: Boolean,
      default: false
    }
  },
  created () {
    // force refresh
    if (!this.list.loaded) {
      this.list.loaded = true
      this.$emit('pageChange', this.list.page)
    }
  },
  methods: {
    onPageChange (page: number) {
      this.list.page = page
      this.$emit('pageChange', page)
    }
  }
}
</script>

<style scoped>

</style>
