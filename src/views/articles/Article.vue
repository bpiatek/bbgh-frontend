<template>
  <CRow>
    <CCol col="12" v-if="article">
      <CCard>
        <CCardBody>
          <h3>
            {{ article.title }}
          </h3>
          <CRow>
            <CCol col="12"><a :href="article.url">{{ article.url }}</a></CCol>
            <CCol col="12" class="text-nowrap">{{ dayjs(article.creationDate).format('YYYY-MM-DD h:mm:ss') }}</CCol>
          </CRow>
          <hr/>
          {{ article.content }}
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack" variant="outline">
            <CIcon name="cilArrowThickFromRight" class="m-0"/>
            {{ $t('actions.go_back') }}
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol col="12" v-if="article">
      <CCard>
        <ApiDataTable
          :items="items"
          :fields="fields"
          :total-pages="totalPages"
          :size="50"
          :header="false"
          :page="page"
          @pageChange="onPageChange"
        >
          <template #info="{item}">
            <td>
              {{ item.content }}
              <div class="text-right">
                <i>{{item.author}}, {{ dayjs(item.dateAdded).format('YYYY-MM-DD h:mm:ss')}}</i>
              </div>
            </td>
          </template>
        </ApiDataTable>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import ApiDataTable from '@/component/ApiDataTable.vue'
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'
import { Article } from '@/api/model/Article'

export default {
  name: 'Article',
  components: { ApiDataTable },
  data () {
    return {
      articleId: null as null|number,
      article: null as null|Article,
      items: [],
      fields: [
        { key: 'info' }
      ],
      totalPages: 1,
      page: 1,
      size: 50
    }
  },
  activated () {
    this.article = null
    this.articleId = this.$route.params.id
    api.articles.getById(this.articleId).then((r) => {
      this.article = r.data
    })
    this.loadComments()
    window.scrollTo(0, 0)
  },
  methods: {
    loadComments () {
      const pagination = new Pagination(this.page - 1, this.size)
      const sorts = [new Sort('dateAdded', SortDirection.desc)]
      api.articles.articleComments(this.articleId, pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
      })
    },
    goBack () {
      this.$router.back()
    },
    onPageChange (newPage: number) {
      this.page = newPage
      this.loadComments()
    }
  }
}
</script>

<style scoped>

</style>
