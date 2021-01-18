<template>

  <Multiselect
      v-if="options"
      v-model="value"
      :options="options"
      :loading="loading"
      :searchable="true"
      :hide-selected="true"
      @search-change="loadPlayers"
      @input="onInput"
      class="search-player"
      label="id"
      track-by="id"
      selectLabel=""
      :placeholder="$t('search player')"
      open-direction="bottom"
      :multiple="false"
      :internal-search="false"
      :clear-on-select="false"
      :close-on-select="false"
      :options-limit="300"
      :limit="3"
      :max-height="600"
      :show-no-results="false"
  >
    <template slot="tag" slot-scope="{ option, remove }">
      <span class="custom__tag"><span>{{ option.firstName }} {{ option.lastName }}</span>
        <span class="custom__remove" @click="remove(option)">❌</span></span>
    </template>
    <template slot="option" slot-scope="props">
      {{ props.option.firstName }} {{ props.option.lastName }}
      <span v-if="props.option.currentTeam">
          ({{ props.option.currentTeam }})
      </span>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import Multiselect from 'vue-multiselect'

import api from '@/api/api'
import { Player } from '@/api/model/Player'

export default {
  name: 'SearchPlayerInput',
  components: { Multiselect },
  props: {},
  data () {
    return {
      value: null,
      options: [],
      searchTimeout: null,
      loading: false
    }
  },
  created () {
    this.options = this.$store.state.playersView.searchPlayerHistory
  },
  methods: {
    loadPlayers (search) {
      if (search === '' || search === null) {
        this.options = this.$store.state.playersView.searchPlayerHistory
        return
      }
      search = search.replace(/\s\s+/g, ' ')
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.searchTimeout = setTimeout(() => {
        this.loading = true
        api.players.search(search).then((r) => {
          this.options = r.data.content
          this.loading = false
        })
      }, 250)
    },
    onInput (player: Player) {
      this.$emit('input', player)
    }
  }
}
</script>

<style scoped>

</style>
