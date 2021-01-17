<template>
  <CCard class="main-card">
    <CCardBody>
      <ApiList
        :list="view.mentionsList"
        :fields="fields"
        :header="!$store.state.mobile"
        @pageChange="loadItems"
        top-pagination
      >
        <template #filters>
          <CRow>
            <CCol lg="3" md="12"></CCol>
            <CCol lg="6" md="12">
              <multiselect
                ref="sentimentFilter"
                class="mentions-sentiment-filter"
                v-model="view.mentionsList.filterSentiment"
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
        </template>
        <template #commentDate="{item}">
          <td class="text-nowrap text-xl-right">
            {{ dayjs(item.commentDate).format('DD MMM YYYY HH:mm') }}
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
              :mention="item"
              inline
            ></MentionSentimentEditor>
            {{ item.commentContent.substr(item.endsAt) }}
          </td>
        </template>
        <template #playerFullName="{item}">
          <td>
            <MentionSentimentEditor
              :mention="item"
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
              <i>{{ dayjs(item.commentDate).format('DD MMM YYYY HH:mm') }}</i> |
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
          <td class="mentions-item-mobile">
            <div class="header">
              <MentionSentimentEditor
                :mention="item"
              ></MentionSentimentEditor>
            </div>
            <div class="content">
              {{ item.commentContent.substr(0, item.startsAt) }}
              <MentionSentimentEditor
                :mention="item"
                inline
              ></MentionSentimentEditor>
              {{ item.commentContent.substr(item.endsAt) }}
            </div>
            <div class="footer">
              <i>{{ dayjs(item.commentDate).format('DD MMM YYYY HH:mm') }}</i>
              <router-link :to="{name: 'Article', params: {id: item.articleId}}">{{
                  $t('mentions.list.article')
                }}</router-link>
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
      view: this.$store.state.mentionsView,
      filterSentimentValue: [],
      fields: this.$store.state.mobile ? [
        { key: 'mobile', sorter: false, label: this.$t('mentions.list.comment') }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('mentions.list.id') },
        { key: 'article', sorter: false, label: this.$t('mentions.list.article') },
        { key: 'commentContent', sorter: false, label: this.$t('mentions.list.comment') },
        { key: 'playerFullName', sorter: false, _classes: 'text-nowrap', label: this.$t('mentions.list.player') },
        { key: 'commentDate', sorter: false, _classes: 'text-nowrap', label: this.$t('mentions.list.commentDate') }
      ],
      filterSentimentOptions: [
        { value: 'NOT_CHECKED', label: this.$t('sentiment.NOT_CHECKED') },
        { value: 'POSITIVE', label: this.$t('sentiment.POSITIVE') },
        { value: 'NEUTRAL', label: this.$t('sentiment.NEUTRAL') },
        { value: 'NEGATIVE', label: this.$t('sentiment.NEGATIVE') }
      ]
    }
  },
  methods: {
    loadItems () {
      const list = this.view.mentionsList
      list.loading = true
      const pagination = new Pagination(this.view.mentionsList.page - 1, list.size)
      const sorts = [new Sort('comment.dateAdded', SortDirection.desc)]
      const sentiments = this.view.mentionsList.filterSentiment.map(v => v.value)
      api.mentions.search(pagination, sorts, sentiments).then((r) => {
        list.items = r.data.content
        list.totalPages = r.data.totalPages
        list.totalElements = r.data.totalElements
        list.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
