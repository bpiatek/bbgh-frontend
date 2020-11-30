<template>
<!--  <CBadge :color="valueColors[value]">{{ value }}</CBadge>-->
    <CDropdown
      class="mention-sentiment-status-dropdown"
      :color="valueColors[value]"
      :toggler-text="player"
    >
<!--      <slot slot="#toggler-content">-->
<!--        <span>fifif</span>-->
<!--      </slot>-->
      <CDropdownItem
        v-for="(v, index) in enumValues"
        :key="index"
        :class="'bg-'+valueColors[v]"
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
      enumValues: MentionSentimentEnum,
      valueColors: {
        POSITIVE: 'success',
        NEUTRAL: 'info',
        NEGATIVE: 'danger',
        NOT_CHECKED: 'secondary'
      }
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
          console.log('Trying to store new alert')
          this.$store.commit('addAlert', Alert.warning('Something wrong'))
        })
    }
  }
}
</script>

<style scoped>

</style>
