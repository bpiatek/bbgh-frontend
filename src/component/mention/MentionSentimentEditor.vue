<template>
  <a
    :class="`text-nowrap btn-mention-sentiment sentiment-${mention.mentionSentiment} ` + (inline ? 'inline' : '')"
    @contextmenu.prevent="showContextMenu"
    @click.prevent="goToPlayer"
    href=""
  >
          {{ playerName }}
  </a>
</template>

<script lang="ts">
import api from '@/api/api'
import { Mention, MentionSentimentEnum } from '@/api/model/Mention'
import { Alert } from '@/model/alert'
import { ContextMenuOption } from '@/model/contextMenu'

export default {
  name: 'MentionSentimentEditor',
  data () {
    return {
      options: [
        { name: MentionSentimentEnum.POSITIVE, label: 'Pozytywny', class: 'sentiment-POSITIVE' },
        { name: MentionSentimentEnum.NEUTRAL, label: 'Neutralny', class: 'sentiment-NEUTRAL' },
        { name: MentionSentimentEnum.NEGATIVE, label: 'Negatywy', class: 'sentiment-NEGATIVE' }
      ]
    }
  },
  props: {
    mention: {
      type: Object as () => Mention,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    short: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    playerName () {
      if (this.short || this.inline) {
        return this.mention.commentContent.substr(this.mention.startsAt, this.mention.endsAt - this.mention.startsAt)
      }
      return this.mention.playerFullName
    }
  },
  methods: {
    goToPlayer () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.$router.push({ name: 'Player', params: { id: this.mention.playerId } }).catch(() => {})
    },
    showContextMenu (event) {
      this.$store.commit('showContextMenu', {
        handler: this.change,
        options: this.options,
        event: event
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    change ($event: { item: unknown; option: ContextMenuOption }) {
      const toValue = $event.option.name as MentionSentimentEnum
      api.mentions.setMentionSentiment(this.mention.id, { mentionSentiment: toValue })
        .then(() => {
          this.mention.mentionSentiment = toValue
          console.log(this.mention.mentionSentiment)
        })
        .catch(() => {
          this.$store.commit('addAlert', Alert.warning('Something wrong'))
        })
    }
  }
}
</script>

<style scoped>

</style>
