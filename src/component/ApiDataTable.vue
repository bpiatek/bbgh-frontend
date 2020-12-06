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
    <div v-if="totalElements" class="text-right pt-1 pb-1 pr-2">
<!--        <small>{{ $t('datatable.page') }}: {{ page }}/{{ totalPages }}</small>,-->
      <small>{{ $t('datatable.total_items') }}: {{ totalElements }}</small>
    </div>
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
  }
}
</script>

<style scoped>

</style>
