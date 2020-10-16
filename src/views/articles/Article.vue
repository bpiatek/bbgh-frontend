<template>
  <CRow v-if="article">
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <h3>
              {{ article.title }}
          </h3>
          <CRow>
            <CCol col="1">ID: {{ article.id }}</CCol>
            <CCol col="6"><a :href="article.url">{{ article.url.length > 60 ? article.url.substring(0, 57) + '...' : article.url }}</a></CCol>
            <CCol col="5" class="text-right">{{ article.creationDate }}</CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {{ article.content }}
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <h5>Comments</h5>
        </CCardHeader>
          <ApiDataTable
            :items="items"
            :fields="fields"
            :total-pages="totalPages"
            :size="50"
            @update="loadComments"
          >
            <template #info="{item}">
              <td>
                <p><i>{{item.author}}</i></p>
                <p><small>{{ dayjs(item.dateAdded).format('h:mm:ss DD/MM/YYYY')}}</small></p>
              </td>
            </template>
          </ApiDataTable>
      </CCard>
    </CCol>
    <CCol col="12">
      <CCard>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import ApiDataTable from '@/component/ApiDataTable.vue'
import { Pagination, Sort } from '@/api/model/common'
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
        { key: 'info', _style: 'width:130px' },
        { key: 'content', _style: '', sorter: false }
      ],
      totalPages: 1
    }
  },
  created () {
    this.articleId = this.$route.params.id
    api.articles.getById(this.articleId).then((r) => {
      this.article = r.data
    })
  },
  methods: {
    loadComments ({ pagination, sorts }: {pagination: Pagination; sorts: Sort[]}) {
      api.articles.articleComments(this.articleId, pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content)
        this.totalPages = r.data.totalPages
      })
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
