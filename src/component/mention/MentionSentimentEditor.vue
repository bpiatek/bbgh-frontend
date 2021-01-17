<template>
  <router-link
    :class="`text-nowrap btn-mention-sentiment sentiment-${mention.mentionSentiment} ` + (inline ? 'inline' : '')"
    :to="{name: 'Player', params: { id: mention.playerId }}"
  >
    {{ playerName }}
  </router-link>
</template>

<script lang="ts">
import api from '@/api/api'
import { Mention, MentionSentimentEnum } from '@/api/model/Mention'
import { Alert } from '@/model/alert'

export default {
  name: 'MentionSentimentEditor',
  data () {
    return {
      enumValues: MentionSentimentEnum
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
    }
  },
  computed: {
    playerName () {
      if (this.inline) {
        return this.mention.commentContent.substr(this.mention.startsAt, this.mention.endsAt - this.mention.startsAt)
      }
      return this.mention.playerFullName
    }
  },
  methods: {,
    change (toValue: MentionSentimentEnum) {
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
