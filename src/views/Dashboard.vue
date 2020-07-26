<template>
  <div>
    <CRow>
      <CCol sm="6" lg="3">
        <router-link
          to="/articles"
        >
        <CWidgetDropdown color="primary" header="Articles" :text="articles.totalElements.toString()">
          <template #footer v-if="articles.last">
            <small class="text-sm-right"><i>Last update: {{ articles.last.creationDate.fromNow() }}</i></small>
          </template>
        </CWidgetDropdown>
        </router-link>
      </CCol>
    </CRow>
  </div>
</template>

<script lang="ts">
import api from '@/api/api'
import { Pagination, SortDirection, Sort } from '@/api/common'
import { ArticleWrapper } from '@/model/articles/ArticleWrapper'

export default {
  name: 'Dashboard',
  components: {},
  data () {
    return {
      articles: {
        totalElements: 0,
        last: null as null|ArticleWrapper
      }
    }
  },
  mounted () {
    api.articles.articles(new Pagination(0, 1), [new Sort('creationDate', SortDirection.desc)])
      .then(r => {
        this.articles.totalElements = r.data.totalElements
        this.articles.last = r.data.content.length > 0 ? new ArticleWrapper(r.data.content[0]) : null
      })
  }
}
</script>
