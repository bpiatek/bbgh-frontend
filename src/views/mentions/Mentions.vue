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
            :total-pages="totalPages"
            :total-elements="totalElements"
            :loading="loading"
            @update="loadItems"
          >
            <template #article="{item}">

              <td>
                <router-link :to="{name: 'Article', params: {id: item.articleId}}">link</router-link>
              </td>
            </template>
            <template #comment="{item}">

              <td>
                {{ item.comment.content }}
              </td>
            </template>
            <template #commentContent="{item}">
              <td>
                {{ item.commentContent.substr(0,item.startsAt) }}
                <!--  one while to preserve whitespace-->
                <span :class="'mention-subject mention-'+item.mentionSentiment">{{ item.commentContent.substr(item.startsAt, item.endsAt - item.startsAt) }}</span>
                {{ item.commentContent.substr(item.endsAt) }}
              </td>
            </template>
            <template #mentionSentiment="{item}">
              <td>
                <MentionSentimentEditor
                  :mention-id="item.id"
                  :value="item.mentionSentiment"
                  @input="item.mentionSentiment = $event"
                ></MentionSentimentEditor>
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
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'
import { Mention } from '@/api/model/Mention'
import MentionSentimentEditor from '@/component/mention/MentionSentimentEditor.vue'

export default {
  name: 'Mentions',
  components: { ApiDataTable, MentionSentimentEditor },
  data () {
    return {
      items: [] as Mention[],
      fields: [
        { key: 'id', _style: 'width:75px', sorter: false },
        { key: 'article', sorter: false },
        { key: 'commentContent', sorter: false },
        { key: 'playerFullName', sorter: false, _style: 'white-space: nowrap;' },
        { key: 'mentionSentiment', sorter: false }
      ],
      totalPages: 1,
      totalElements: 0,
      loading: false
    }
  },
  methods: {
    loadItems ({ pagination }: {pagination: Pagination}) {
      this.loading = true
      const sorts = [new Sort('id', SortDirection.desc)]
      api.mentions.search(pagination, sorts).then((r) => {
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
.mention-subject {
  font-weight: bold;
  color: black;
  border-radius: 0.5rem;
  padding: 0.125rem 0.5rem 0.125rem 0.5rem;
}
.mention-NOT_CHECKED {
  background-color: #ced2d8;
}
.mention-POSITIVE {
  background-color: #2eb85c;
}
.mention-NEUTRAL {
  background-color: #39f;
}
.mention-NEGATIVE {
  background-color: #e55353;
}
</style>
