<template>
  <CCard class="main-card">
    <CCardBody>
      <ApiList
        :list="$store.state.mentionsList"
        :fields="fields"
        :loading="loading"
        :header="!$store.state.mobile"
        @loadItems="loadItems"
        @queryChange="onQueryChange"
      >
        <slot slot="#filters">
          <CRow>
            <CCol lg="3" md="12"></CCol>
            <CCol lg="6" md="12">
              <multiselect
                ref="sentimentFilter"
                :value="filterSentiment"
                class="mentions-sentiment-filter"
                :searchable="false"
                :multiple="true"
                :clear-on-select="false"
                :hide-selected="true"
                :placeholder="$t('mentions.filters.sentiment.placeholder')"
                label="label"
                track-by="value"
                :show-labels="false"
                @input="onFilterSentimentChange"
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
                class="mention-sentiment-in-text"
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
      </ApiList>
    </CCardBody>
  </CCard>
</template>

<script lang="ts">
import ApiList from '@/component/ApiList.vue'
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'
import { Mention } from '@/api/model/Mention'
import MentionSentimentEditor from '@/component/mention/MentionSentimentEditor.vue'
import Multiselect from 'vue-multiselect'

type FilterSentimentOption = {
  value: string;
  label: string;
}

export default {
  name: 'Mentions',
  components: { ApiList, MentionSentimentEditor, Multiselect },
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
      loading: false,
      filterSentiment: [],
      filterSentimentOptions: [
        { value: 'NOT_CHECKED', label: this.$t('sentiment.NOT_CHECKED') },
        { value: 'POSITIVE', label: this.$t('sentiment.POSITIVE') },
        { value: 'NEUTRAL', label: this.$t('sentiment.NEUTRAL') },
        { value: 'NEGATIVE', label: this.$t('sentiment.NEGATIVE') }
      ]
    }
  },
  created () {
    if (this.$route.query.page === undefined) {
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    }
  },
  methods: {
    onFilterSentimentChange ($event: {value: string}[]) {
      this.$router.push({
        query: { ...this.$route.query, ...{ page: 1, sentiments: $event.length > 0 ? $event.map(v => v.value).join(',') : undefined } }
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {})
    },
    loadItems () {
      this.loading = true
      const pagination = new Pagination(this.$route.query.page - 1, this.$store.state.mentionsList.size)
      const sorts = [new Sort('comment.dateAdded', SortDirection.desc)]
      const sentiments = this.$route.query.sentiments ? this.$route.query.sentiments.split(',') : []
      api.mentions.search(pagination, sorts, sentiments).then((r) => {
        this.$store.state.mentionsList.items = r.data.content
        this.$store.state.mentionsList.totalPages = r.data.totalPages
        this.$store.state.mentionsList.totalElements = r.data.totalElements
        this.$store.state.mentionsList.page = r.data.number + 1
        this.$store.state.mentionsList.filterSentiment = sentiments
        this.loading = false
      })
    },
    onQueryChange () {
      const sentiments = this.$route.query.sentiments ? this.$route.query.sentiments.split(',') : []
      this.filterSentiment = this.filterSentimentOptions.filter((v: FilterSentimentOption) => sentiments.includes(v.value))
    }
  }
}
</script>

<style scoped>

</style>
