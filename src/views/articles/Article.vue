<template>
  <CRow v-if="article">
    <CCol col="12" lg="12">
      <CCard>
        <CCardBody>
          <table class="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>URL</th>
              <th>Creation Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ articleId }}</td>
              <td><a :href="article.url">{{ article.url }}</a></td>
              <td>{{ article.creationDate }}</td>
            </tr>
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="12">
      <CCard>
        <CCardHeader>
          <h3>
            {{ article.title }}
          </h3>
        </CCardHeader>
        <CCardBody>
          {{ article.content }}
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="12" lg="12">
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
                <p><small>{{item.dateAdded.format('h:mm:ss DD/MM/YYYY')}}</small></p>
              </td>
            </template>
            <template #actions="">
              <td>

              </td>
            </template>
          </ApiDataTable>
      </CCard>
    </CCol>
    <CCol col="12" lg="12">
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
import { Pagination, Sort } from '@/api/common'
import api from '@/api/api'
import { Comment } from '@/api/modules/articles'
import { CommentWrapper } from '@/model/articles/CommentWrapper'
import { ArticleWrapper } from '@/model/articles/ArticleWrapper'

export default {
  name: 'Article',
  components: { ApiDataTable },
  data () {
    return {
      articleId: null as null|number,
      article: null as null|ArticleWrapper,
      items: [],
      fields: [
        { key: 'info', _style: 'width:130px' },
        { key: 'content', _style: '', sorter: false },
        {
          key: 'actions',
          label: 'Actions',
          _style: 'width:1%',
          sorter: false,
          filter: false
        }
      ],
      totalPages: 1
    }
  },
  created () {
    this.articleId = this.$route.params.id
    api.articles.article(this.articleId).then((r) => {
      this.article = new ArticleWrapper(r.data)
    })
  },
  methods: {
    loadComments ({ pagination, sorts }: {pagination: Pagination; sorts: Sort[]}) {
      api.articles.articleComments(this.articleId, pagination, sorts).then((r) => {
        this.items = this.items.slice(0, 0).concat(r.data.content.map((c: Comment) => new CommentWrapper(c)))
        this.totalPages = r.data.totalPages
      })
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>
