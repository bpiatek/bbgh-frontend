<template>
  <ApiList
    :list="list"
    :fields="fields"
    :header="header"
    top-pagination
    @pageChange="onPageChange"
  >
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </ApiList>
</template>

<script lang="ts">
import { List } from '@/model/list'
import ApiList from '@/component/ApiList.vue'

export default {
  name: 'ApiListView',
  components: { ApiList },
  props: {
    fields: Array,
    header: {
      type: Boolean,
      default: false
    },
    list: List
  },
  created () {
    // this.onQueryChange()
  },
  methods: {
    onPageChange (newPage: number) {
      this.$emit('loadItems')
    }
  }
}
</script>

<style scoped>

</style>
