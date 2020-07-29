<template>
<!--  <CBadge :color="valueColors[value]">{{ value }}</CBadge>-->
    <CDropdown
      class="comment-opinion-status-dropdown"
      :color="valueColors[value]"
      :toggler-text="value"
    >
      <CDropdownItem
        v-for="(v, index) in enumValues"
        :key="index"
        :class="'bg-'+valueColors[v]"
        @click="change(v)"
      >
        {{ v }}
      </CDropdownItem>
    </CDropdown>
</template>

<script lang="ts">
import { CommentOpinionStatusEnum } from '@/api/model/Comment'
import api from '@/api/api'
import { Alert } from '@/store'

export default {
  name: 'CommentOpinionStatus',
  data () {
    return {
      enumValues: CommentOpinionStatusEnum,
      valueColors: {
        POSITIVE: 'success',
        NEUTRAL: 'info',
        NEGATIVE: 'danger',
        NOT_OPINION: '',
        NOT_CHECKED: 'secondary'
      }
    }
  },
  props: {
    commentId: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    change (toValue: CommentOpinionStatusEnum) {
      api.comments.setCommentStatus(this.commentId, { status: toValue })
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
