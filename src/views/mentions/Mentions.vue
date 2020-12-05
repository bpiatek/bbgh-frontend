<template>
  <CCard class="main-card">
    <CCardBody>
      <ApiDataTable
        :items="$store.state.mentionsList.items"
        :fields="fields"
        :total-pages="$store.state.mentionsList.totalPages"
        :total-elements="$store.state.mentionsList.totalElements"
        :loading="loading"
        :header="!$store.state.mobile"
        :page="$store.state.mentionsList.page"
        @pageChange="onPageChange"
      >
        <slot slot="#filters">
          <CRow>
            <CCol lg="3" md="12"></CCol>
            <CCol lg="6" md="12">
              <multiselect
                ref="sentimentFilter"
                class="mentions-sentiment-filter"
                v-model="filterSentiment"
                :searchable="false"
                :multiple="true"
                :clear-on-select="false"
                :hide-selected="true"
                :placeholder="$t('mentions.filters.sentiment.placeholder')"
                label="label"
                track-by="value"
                :show-labels="false"
                @input="loadItems"
                :options="filterSentimentOptions">
                <template slot="tag" slot-scope="props">
                  <button
                    :class="'multiselect-selected btn btn-mention-sentiment sentiment-'+ props.option.value"
                    @keypress.enter.prevent="$refs.sentimentFilter.removeElement(props.option)"
                    @mousedown.prevent="$refs.sentimentFilter.removeElement(props.option)"
                  >{{ props.option.label }}</button>
                </template>
                <template slot="option" slot-scope="props">
                  <button :class="'btn btn-mention-sentiment sentiment-'+ props.option.value">{{ props.option.label }}</button>
                </template>
              </multiselect>
            </CCol>
            <CCol lg="3" md="12"></CCol>

          </CRow>
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
            {{ item.commentContent.substr(0, item.startsAt) }}<span
            :class="'mention-subject mention-'+item.mentionSentiment">{{
              item.commentContent.substr(item.startsAt, item.endsAt - item.startsAt)
            }}</span>{{ item.commentContent.substr(item.endsAt) }}
            <br>
            <div class="mentions-mobile-comment-footer">
              <i>{{ dayjs(item.commentDate).format('YYYY-MM-DD HH:mm:ss') }}</i> |
              <strong>
                <router-link :to="{name: 'Article', params: {id: item.articleId}}">{{
                    $t('mentions.list.article')
                  }}
                </router-link>
              </strong>
            </div>
          </td>
        </template>
        <template #mobile="{item}">
          <td class="datatable-mobile mentions-mobile-comment">
            <div class="mentions-mobile-comment-header pb-2">
              <MentionSentimentEditor
                :mention-id="item.id"
                :value="item.mentionSentiment"
                :player="item.playerFullName"
                @input="item.mentionSentiment = $event"
              ></MentionSentimentEditor>
            </div>
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
            <div class="text-nowrap pt-2 text-right">
              <i class="text-nowrap">{{ dayjs(item.commentDate).format('YYYY-MM-DD HH:mm:ss') }}</i>
              <span class="text-nowrap pl-2">
                <router-link :to="{name: 'Article', params: {id: item.articleId}}">{{
                    $t('mentions.list.article')
                  }}</router-link>
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
import Multiselect from 'vue-multiselect'
import { MentionsList } from '@/store'

export default {
  name: 'Mentions',
  components: { ApiDataTable, MentionSentimentEditor, Multiselect },
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
      page: 1,
      totalPages: 1,
      totalElements: 0,
      loading: false,
      filterSentiment: this.$store.state.mentionsList.filterSentiment,
      sentiments: {
        NOT_CHECKED: this.$t('sentiment.NOT_CHECKED'),
        POSITIVE: this.$t('sentiment.POSITIVE'),
        NEUTRAL: this.$t('sentiment.NEUTRAL'),
        NEGATIVE: this.$t('sentiment.NEGATIVE')
      }
    }
  },
  computed: {
    filterSentimentOptions () {
      const result: {}[] = []
      for (const [key, value] of Object.entries(this.sentiments)) {
        result.push({ value: key, label: value })
      }
      return result
    }
  },
  created () {
    document.addEventListener('scroll', this.onScrollChange)
  },
  activated () {
    if (this.$store.state.mentionsList.page === 0) {
      this.loadParamsFromQuery()
      this.loadItems()
    } else {
      this.saveStateToQuery()
    }
    this.$nextTick(function () {
      window.scrollTo(
        this.$store.state.mentionsList.scrollPosition.x,
        this.$store.state.mentionsList.scrollPosition.y
      )
    })
  },
  destroyed () {
    document.removeEventListener('scroll', this.onScrollChange)
  },
  methods: {
    loadItems () {
      this.loading = true
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = [new Sort('comment.dateAdded', SortDirection.desc)]
      const sentiments = this.filterSentiment.map((s: {value: string}) => s.value)
      api.mentions.search(pagination, sorts, sentiments).then((r) => {
        const listData = new MentionsList()
        listData.items = r.data.content
        listData.totalPages = r.data.totalPages
        listData.totalElements = r.data.totalElements
        listData.page = this.page
        listData.filterSentiment = this.filterSentiment
        this.$store.commit('setMentionsList', listData)
        this.loading = false
        this.saveStateToQuery()
      })
    },
    onScrollChange () {
      this.$store.state.mentionsList.scrollPosition.y = window.scrollY
    },
    onPageChange (newPage: number) {
      this.page = newPage
      window.scrollTo(0, 0)
      this.loadItems()
    },
    saveStateToQuery () {
      this.$router.push({
        query: {
          page: this.page.toString(),
          sentiments: this.filterSentiment.map((s: {value: string}) => s.value)
        }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    },
    loadParamsFromQuery () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
      let sentiments = this.$route.query.sentiments
      if (sentiments !== undefined) {
        sentiments = sentiments.split(',')
        sentiments.forEach((value: string) => this.filterSentiment.push({ value: value, label: this.sentiments[value] }))
      }
    }
  }
}
</script>

<style scoped>

</style>
