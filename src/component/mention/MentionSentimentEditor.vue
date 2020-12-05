<template>
    <CDropdown
      class="mention-sentiment-status-dropdown"
      :toggler-text="player"
      :add-toggler-classes="`btn-mention-sentiment sentiment-${value}`"
    >
      <CDropdownItem
        v-for="(v, index) in enumValues"
        :key="index"
        @click="change(v)"
      >
        {{ $t("sentiment."+v) }}
      </CDropdownItem>
    </CDropdown>
</template>

<script lang="ts">
import api from '@/api/api'
import { Alert } from '@/store'
import { MentionSentimentEnum } from '@/api/model/Mention'

export default {
  name: 'MentionSentimentEditor',
  data () {
    return {
      enumValues: MentionSentimentEnum
    }
  },
  props: {
    mentionId: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    player: {
      type: String,
      required: true
    }
  },
  methods: {
    change (toValue: MentionSentimentEnum) {
      api.mentions.setMentionSentiment(this.mentionId, { mentionSentiment: toValue })
        .then(() => {
          this.$emit('input', toValue)
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
