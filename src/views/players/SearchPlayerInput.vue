<template>
  <VueSelect
    v-if="options"
    :filterable="false"
    :options="options"
    :value="selectedPlayer"
    label="id"
    @search="loadPlayers"
    @input="onInput"
    class="search-player"
    :placeholder="$t('search player')"
  >
    <template slot="no-options">
        <span>
          {{$t('search player')}}
        </span>
    </template>
    <template slot="option" slot-scope="option">

      {{ option.firstName }} {{ option.lastName }}
      <span v-if="option.currentTeam">
          ({{ option.currentTeam }})
        </span>
    </template>
    <template slot="selected-option" slot-scope="option">
      {{ option.firstName }} {{ option.lastName }}
    </template>
  </VueSelect>
</template>

<script lang="ts">
import VueSelect from 'vue-select'
import api from '@/api/api'
import { Player } from '@/api/model/Player'

export default {
  name: 'SearchPlayerInput',
  components: { VueSelect },
  props: {
    selectedPlayer: {
      type: Object as () => Player,
      default: null
    }
  },
  data () {
    return {
      options: [],
      searchTimeout: null
    }
  },
  created () {
    this.options = this.$store.state.playersView.searchPlayerHistory
  },
  methods: {
    loadPlayers (search, loading) {
      if (search === '' || search === null) {
        this.options = this.$store.state.playersView.searchPlayerHistory
        return
      }
      search = search.replace(/\s\s+/g, ' ')

      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(() => {
        loading(true)
        api.players.search(search).then((r) => {
          this.options = r.data.content
          loading(false)
        })
      }, 750)
    },
    onInput (player: Player) {
      this.$emit('input', player)
    }
  }
}
</script>

<style scoped>

</style>
