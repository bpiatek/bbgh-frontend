<template>
  <CRow>
    <CCol col="12" xl="12">
      <CCard>
        <CCardHeader>
          <h3>Mentions</h3>
        </CCardHeader>
        <CCardBody>
          <ApiDataTable
            :items="items"
            :fields="fields"
            :total-pages="totalPages"g
            :total-elements="totalElements"
            :loading="loading"
            @update="loadItems"
          >
            <template #player="{item}">
              <td v-if="item.player">
                {{ item.player.firstName + " " + item.player.lastName }}
              </td>
              <td v-else>
                -
              </td>
            </template>
            <template #comment="{item}">

              <td>
                {{ item.comment.content }}
              </td>
            </template>
          </ApiDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import ApiDataTable from '@/component/ApiDataTable.vue'
import { Pagination } from '@/api/model/common'
import api from '@/api/api'
import { Mention } from '@/api/model/Mention'

export default {
  name: 'Mentions',
  components: { ApiDataTable },
  data () {
    return {
      items: [] as Mention[],
      fields: [
        { key: 'id', _style: 'width:75px' },
        { key: 'comment', sorter: false },
        { key: 'player', sorter: false },
        { key: 'sentiment', sorter: false }
      ],
      totalPages: 1,
      totalElements: 0,
      loading: false
    }
  },
  methods: {
    loadItems ({ pagination }: {pagination: Pagination}) {
      this.loading = true
      api.mentions.search(pagination).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
        this.totalElements = r.data.totalElements
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
