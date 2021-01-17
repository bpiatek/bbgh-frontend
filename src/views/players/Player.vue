<template>
  <CRow class="player">
    <CCol col="12">
      <CCard>
        <CCardBody>
          <SearchPlayerInput
            @input="playerSelected"
          ></SearchPlayerInput>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="12" v-if="view.player">
      <CCard>
        <CCardHeader class="text-center">
          <h1>{{ view.player.firstName }} {{ view.player.lastName }}</h1>
        </CCardHeader>
        <CCardBody>
          <CRow class="player-info">
            <CCol col="12" md="4">
              <h5>Profil</h5>
              <table class="player-info-table">
                <tbody>
                <tr>
                  <th>Data urodzenia</th>
                  <td>{{ dayjs(view.player.dateOfBirth).format('DD MMMM YYYY') }}</td>
                </tr>
                <tr>
                  <th>Obecna drużyna</th>
                  <td>{{ view.player.currentTeam }}</td>
                </tr>
                <tr>
                  <th>Profil 90minut.pl</th>
                  <td><a :href="`http://www.90minut.pl/kariera.php?id=${view.player.urlId}`">{{ view.player.firstName }}
                    {{ view.player.lastName }}</a></td>
                </tr>
                </tbody>
              </table>
            </CCol>
            <CCol col="6" md="4">
              <h5>Wzmianki</h5>
              <table class="player-info" v-if="view.playerRatio">
                <tbody>
                <tr>
                  <th >Pozytywnych</th>
                  <td class="text-right">{{ view.playerRatio.positive }}</td>
                </tr>
                <tr>
                  <th >Negatywnych</th>
                  <td class="text-right">{{ view.playerRatio.negative }}</td>
                </tr>
                <tr>
                  <th >Neutralnych</th>
                  <td class="text-right">{{ view.playerRatio.neutral }}</td>
                </tr>
                </tbody>
              </table>
            </CCol>
            <CCol col="6" md="4" v-if="view.playerRatio">
              <h5>Pozytywnych</h5>
              <span class="player-score">{{ view.playerRatio.ratio }} %</span>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
    <!--    Mentions -->
    <CCol col="12" v-if="view.player">
      <CCard>
        <ApiList
          :list="view.mentionsList"
          :fields="mentionsListFields"
          :header="false"
          @pageChange="onMentionsPageChange"
        >
          <template #header>
            <h3> {{ $t('Mentions') }}</h3>
          </template>
          <template #commentDate="{item}">
            <td class="text-nowrap text-xl-right">
              {{ dayjs(item.commentDate).format('DD MMM YYYY HH:mm') }}
            </td>
          </template>
          <template #article="{item}">
            <td>
              <router-link :to="{name: 'Article', params: {id: item.articleId}}">Artykuł</router-link>
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
          <template #mobile="{item}">
            <td class="datatable-mobile mentions-mobile-comment">
              <div class="mentions-mobile-comment-content">
                {{ item.commentContent.substr(0, item.startsAt) }}
                <MentionSentimentEditor
                  :mention="item"
                  inline
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
      </CCard>
    </CCol>
    <!--    Articles -->
    <CCol col="12" v-if="view.player">
      <CCard>
        <ApiList
          :list="view.articlesList"
          :fields="articlesListFields"
          :header="false"
          @pageChange="onArticlesPageChange"
        >
          <template #header>
            <h3> {{ $t('Articles') }}</h3>
          </template>
          <template #url="{item}">
            <td style="width: 1%">
              <a :href="item.url">link</a>
            </td>
          </template>
          <template #title="{item}">
            <td>
              <router-link
                class="a-soft"
                :to="{name: 'Article', params: {id: item.id}}"
              >
                {{ item.title }}
              </router-link>
            </td>
          </template>
          <template #creationDate="{item}">
            <td style="width: 1%" class="text-nowrap text-xl-right">
              {{ dayjs(item.creationDate).format('DD MMM YYYY HH:mm') }}
            </td>
          </template>
          <template #mobile="{item}">
            <td>
              <router-link
                class="a-soft"
                :to="{name: 'Article', params: {id: item.id}}"
              >
                {{ item.title }}
              </router-link>
              <div class="text-nowrap pt-2 text-right">
                <i class="text-nowrap">{{ dayjs(item.creationDate).format('DD MMM YYYY HH:mm') }}</i>
                <span class="text-nowrap pl-2">
                <a :href="item.url">90minut.pl</a>
              </span>
              </div>
            </td>
          </template>
        </ApiList>
      </CCard>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { Pagination, Sort, SortDirection } from '@/api/model/common'
import api from '@/api/api'
import { Player } from '@/api/model/Player'
import ApiList from '@/component/ApiList.vue'
import MentionSentimentEditor from '@/component/mention/MentionSentimentEditor.vue'
import SearchPlayerInput from '@/views/players/SearchPlayerInput.vue'

export default {
  name: 'Player',
  components: { ApiList, MentionSentimentEditor, SearchPlayerInput },
  data () {
    return {
      view: this.$store.state.playersView,
      mentionsListFields: this.$store.state.mobile ? [
        { key: 'mobile', sorter: false, label: this.$t('mentions.list.comment') }
      ] : [
        { key: 'commentDate', sorter: false, _classes: 'text-nowrap', label: this.$t('mentions.list.commentDate') },
        { key: 'article', sorter: false, label: this.$t('mentions.list.article') },
        { key: 'commentContent', sorter: false, label: this.$t('mentions.list.comment') }
      ],
      articlesListFields: this.$store.state.mobile ? [
        { key: 'mobile' }
      ] : [
        { key: 'creationDate', sorter: false, label: this.$t('articles.list.creationDate') },
        { key: 'url', sorter: false, label: this.$t('articles.list.url') },
        { key: 'title', sorter: false, label: this.$t('articles.list.title') }
      ]
    }
  },
  created () {
    if (this.$route.params.id && this.$route.params.id !== (this.player ? this.player.id : undefined)) {
      api.players.getById(this.$route.params.id).then((r) => {
        this.playerSelected(r.data)
      })
    }
    this.loadInputHistory()
  },
  methods: {
    loadMentions () {
      const list = this.view.mentionsList
      const pagination = new Pagination(list.page - 1, list.size)
      const sorts = [new Sort('comment.dateAdded', SortDirection.desc)]
      list.loading = true
      api.mentions.playerMentions(this.view.player.id, pagination, sorts).then((r) => {
        list.items = r.data.content
        list.totalPages = r.data.totalPages
        list.totalElements = r.data.totalElements
        list.page = r.data.number + 1
        list.loading = false
      })
    },
    loadArticles () {
      const list = this.view.articlesList
      const pagination = new Pagination(list.page - 1, list.size)
      list.loading = true
      api.articles.playerArticles(this.view.player.id, pagination, []).then((r) => {
        list.items = r.data.content
        list.totalPages = r.data.totalPages
        list.totalElements = r.data.totalElements
        list.page = r.data.number + 1
        list.loading = false
      })
    },
    onMentionsPageChange (newPage: number) {
      this.view.mentionsList.page = newPage
      this.loadMentions()
    },
    onArticlesPageChange (newPage: number) {
      this.view.articlesList.page = newPage
      this.loadArticles()
    },
    playerSelected (player: Player) {
      if (this.view.player && player.id === this.view.player.id) {
        return
      }
      this.view.player = player
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.$router.push({ name: 'Player', params: { id: this.view.player.id } }).catch(() => {})
      api.players.playerRatio(this.view.player.id).then((r) => {
        this.view.playerRatio = r.data
      })
      this.loadMentions()
      this.loadArticles()
      this.addPlayerToInputHistory(player)
    },
    loadInputHistory () {
      const historyString = localStorage.getItem('searchPlayerInputHistory')
      this.view.searchPlayerHistory = historyString ? JSON.parse(historyString) : []
    },
    addPlayerToInputHistory (player: Player) {
      this.view.searchPlayerHistory = this.view.searchPlayerHistory.filter((v) => v.id !== player.id)
      this.view.searchPlayerHistory.unshift(player)
      this.view.searchPlayerHistory = this.view.searchPlayerHistory.slice(0, 30)
      localStorage.setItem('searchPlayerInputHistory', JSON.stringify(this.view.searchPlayerHistory))
    }
  }
}
</script>

<style scoped>

</style>
