<template>
  <div>
    <CRow>
      <CCol sm="6" lg="3">
        <router-link
          to="/articles"
        >
        <CWidgetDropdown color="primary" header="Articles" :text="articles.totalElements.toString()">
          <template #footer v-if="articles.last">
            <small class="text-sm-right"><i>Last update: {{ dayjs(articles.last.creationDate).fromNow() }}</i></small>
          </template>
        </CWidgetDropdown>
        </router-link>
      </CCol>
    </CRow>
  </div>
</template>

<script lang="ts">
import api from '@/api/api'
import { Pagination, SortDirection, Sort } from '@/api/model/common'
import { Article } from '@/api/model/Article'

export default {
  name: 'Dashboard',
  components: {},
  data () {
    return {
      articles: {
        totalElements: 0,
        last: undefined as undefined|Article
      }
    }
  },
  mounted () {
    api.articles.articles(new Pagination(0, 1), [new Sort('creationDate', SortDirection.desc)])
      .then(r => {
        this.articles.totalElements = r.data.totalElements
        this.articles.last = r.data.content[0]
      })
  }
}
</script>
