<template>
  <CCard class="card-border-round">
    <CCardBody class="md-p-0">
      <ApiDataTable
        :items="items"
        :fields="fields"
        :total-pages="totalPages"
        :total-elements="totalElements"
        :loading="loading"
        :header="!$store.state.mobile"
        use-query
        @update="loadItems"
      >
        <slot slot="#header">
          <h3>{{ $t('mentions.list_header') }}</h3>
        </slot>
        <template #commentDate="{item}">
          <td class="text-nowrap text-xl-right">
            {{ dayjs(item.commentDate).format('YYYY-MM-DD HH:mm:ss') }}
          </td>
        </template>
        <template #article="{item}">
          <td>
            <router-link :to="{name: 'Article', params: {id: item.articleId}}">link</router-link>
          </td>
        </template>
        <template #commentContent="{item}">
          <td>
            {{ item.commentContent.substr(0, item.startsAt) }}
            <MentionSentimentEditor
              :mention-id="item.id"
              :value="item.mentionSentiment"
              @input="item.mentionSentiment = $event"
              :player="item.commentContent.substr(item.startsAt, item.endsAt - item.startsAt)"
            ></MentionSentimentEditor>
            {{ item.commentContent.substr(item.endsAt) }}
          </td>
        </template>
        <template #playerFullName="{item}">
          <td>
            <MentionSentimentEditor
              :mention-id="item.id"
              :value="item.mentionSentiment"
              @input="item.mentionSentiment = $event"
              :player="item.playerFullName"
            ></MentionSentimentEditor>
          </td>
        </template>
        <template #mobileComment="{item}">
          <td class="mentions-mobile-comment">
            {{ item.commentContent.substr(0, item.startsAt) }}<span :class="'mention-subject mention-'+item.mentionSentiment">{{ item.commentContent.substr(item.startsAt, item.endsAt - item.startsAt) }}</span>{{ item.commentContent.substr(item.endsAt) }}
            <br>
            <div class="mentions-mobile-comment-footer">
              <i>{{ dayjs(item.commentDate).format('YYYY-MM-DD HH:mm:ss') }}</i> |
              <strong>
                <router-link :to="{name: 'Article', params: {id: item.articleId}}">{{ $t('mentions.list.article') }}</router-link>
              </strong>
            </div>
          </td>
        </template>
        <template #mobile="{item}">
          <td class="mentions-mobile-comment">
            <div class="mentions-mobile-comment-header">
                <MentionSentimentEditor
                  :mention-id="item.id"
                  :value="item.mentionSentiment"
                  :player="item.playerFullName"
                  @input="item.mentionSentiment = $event"
                ></MentionSentimentEditor>
            </div>
            <hr class="mt-1 mb-1">
            <div class="mentions-mobile-comment-content">
              {{ item.commentContent.substr(0, item.startsAt) }}
              <MentionSentimentEditor
                :mention-id="item.id"
                :value="item.mentionSentiment"
                @input="item.mentionSentiment = $event"
                :player="item.commentContent.substr(item.startsAt, item.endsAt - item.startsAt)"
              ></MentionSentimentEditor>
              {{ item.commentContent.substr(item.endsAt) }}
            </div>
            <div class="text-nowrap pt-1 mt-1 b-t-1 text-right">
              <i class="text-nowrap">{{ dayjs(item.commentDate).format('YYYY-MM-DD HH:mm:ss') }}</i>
              <span class="text-nowrap pl-2">
                <router-link :to="{name: 'Article', params: {id: item.articleId}}">{{ $t('mentions.list.article') }}</router-link>
              </span>
            </div>
          </td>
        </template>
      </ApiDataTable>
    </CCardBody>
  </CCard>
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
      fields: this.$store.state.mobile ? [
        { key: 'mobile', sorter: false, label: this.$t('mentions.list.comment') }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('mentions.list.id') },
        { key: 'article', sorter: false, label: this.$t('mentions.list.article') },
        { key: 'commentContent', sorter: false, label: this.$t('mentions.list.comment') },
        { key: 'playerFullName', sorter: false, _classes: 'text-nowrap', label: this.$t('mentions.list.player') },
        { key: 'commentDate', sorter: false, _classes: 'text-nowrap', label: this.$t('mentions.list.commentDate') }
      ],
      totalPages: 1,
      totalElements: 0,
      loading: false,
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    loadItems ({ pagination }: { pagination: Pagination }) {
      this.loading = true
      const sorts = [new Sort('id', SortDirection.desc)]
      api.mentions.search(pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
        this.totalElements = r.data.totalElements
        this.loading = false
      })
    },
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
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
