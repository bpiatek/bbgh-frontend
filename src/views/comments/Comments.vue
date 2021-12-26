<template>
  <CCard class="main-card">
    <CCardBody class="pt-0">
      <ApiList
        :list="view.commentsList"
        :fields="fields"
        :header="!$store.state.mobile"
        @pageChange="loadItems"
        class="comments"
        top-pagination
      >
        <template #url="{item}">
          <td>
            <a :href="item.url">link</a>
          </td>
        </template>
        <template #articleId="{item}">
          <td>
            <router-link
              class="a-soft"
              :to="{name: 'Article', params: {id: item.articleId}}"
            >
              {{  item.articleId  }}
            </router-link>
          </td>
        </template>
        <template #dateAdded="{item}">
          <td class="text-nowrap text-xl-right">
            {{ dayjs(item.dateAdded).format('DD MMM YYYY HH:mm') }}
          </td>
        </template>
        <template #mobile="{item}">
          <td>
            <span>{{ item.content }}</span>
            <div class="text-nowrap pt-2 text-right">
              <span>{{ item.author }}, </span>
              <i class="text-nowrap">{{  dayjs(item.dateAdded).format('DD MMM YYYY HH:mm')  }}</i>
              <router-link
                class="a-soft"
                :to="{name: 'Article', params: {id: item.articleId}}"
              >
                {{  item.articleId  }}
              </router-link>
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

export default {
  name: 'Comments',
  components: { ApiList },
  data () {
    return {
      view: this.$store.state.commentsView,
      fields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('comments.list.id') },
        { key: 'articleId', _style: 'width:75px', sorter: false, label: this.$t('comments.list.article') },
        { key: 'author', _style: 'min-width:200px;', sorter: false, label: this.$t('comments.list.author') },
        { key: 'content', _style: 'min-width:200px;', sorter: false, label: this.$t('comments.list.content') },
        { key: 'dateAdded', _style: 'width: 1%; white-space: nowrap;', sorter: false, label: this.$t('comments.list.dateAdded') }
      ],
      loading: false
    }
  },
  methods: {
    loadItems () {
      const list = this.view.commentsList
      list.loading = true
      const pagination = new Pagination(list.page - 1, list.size)
      const sorts = [new Sort('id', SortDirection.desc)]
      api.comments.search(pagination, sorts).then((r) => {
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
