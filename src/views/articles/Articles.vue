<template>
  <CCard class="main-card">
    <CCardBody class="pt-0">
      <ApiList
        :list="$store.state.articlesList"
        :fields="fields"
        :loading="loading"
        :header="!$store.state.mobile"
        @loadItems="loadItems"
        class="articles"
      >
        <template #url="{item}">
          <td>
            <a :href="item.url">link</a>
          </td>
        </template>
        <template #title="{item}">
          <td>
            <router-link
              class="a-soft"
              :to="{name: 'Article', params: {id: item.id}}"
            >
              {{  item.title  }}
            </router-link>
          </td>
        </template>
        <template #creationDate="{item}">
          <td class="text-nowrap text-xl-right">
            {{ dayjs(item.creationDate).format('YYYY-MM-DD HH:mm:ss') }}
          </td>
        </template>
        <template #mobile="{item}">
          <td>
            <router-link
              class="a-soft"
              :to="{name: 'Article', params: {id: item.id}}"
            >
              {{  item.title  }}
            </router-link>
            <div class="text-nowrap pt-2 text-right">
              <i class="text-nowrap">{{  dayjs(item.creationDate).format('YYYY-MM-DD HH:mm:ss')  }}</i>
              <span class="text-nowrap pl-2">
                <a :href="item.url">90minut.pl</a>
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

export default {
  name: 'Articles',
  components: { ApiList },
  data () {
    return {
      fields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'id', _style: 'width:75px', sorter: false, label: this.$t('articles.list.id') },
        { key: 'url', _style: 'width:75px', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', _style: 'min-width:200px;', sorter: false, label: this.$t('articles.list.title') },
        { key: 'creationDate', _style: 'width: 1%; white-space: nowrap;', sorter: false, label: this.$t('articles.list.creationDate') }
      ],
      loading: false
    }
  },
  methods: {
    loadItems () {
      this.loading = true
      const pagination = new Pagination(this.$route.query.page - 1, this.$store.state.articlesList.size)
      const sorts = [new Sort('creationDate', SortDirection.desc)]
      api.articles.articles(pagination, sorts).then((r) => {
        const listData = this.$store.state.articlesList
        listData.items = r.data.content
        listData.totalPages = r.data.totalPages
        listData.totalElements = r.data.totalElements
        listData.page = r.data.number + 1
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
