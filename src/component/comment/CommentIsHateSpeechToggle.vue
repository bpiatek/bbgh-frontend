<template>
  <CSwitch
    color="danger"
    variant="3d"
    @update:checked="onCheck($event)"
  >
  </CSwitch>
</template>

<script>
export default {
  name: 'CommentIsHateSpeechToggle'
}
</script>

<script lang="ts">
import api from '@/api/api'
import { Alert } from '@/model/alert'
import {Comment} from '@/api/model/Comment'

export default {
  name: 'CommentIsHateSpeechEditor',
  data () {
    return {
      state: undefined
    }
  },
  props: {
    comment: {
      type: Object as () => Comment,
      required: true
    }
  },
  computed: {
  },
  methods: {
    onCheck ($event: boolean) {
      api.comments.setIsHateSpeech(this.comment.id, {hateSpeech: $event})
        .then(() => {
          this.comment.isHateSpeech = $event
        })
        .catch(() => {
          this.$store.commit('addAlert', Alert.warning('Something went wrong'))
        })
    }
  }
}
</script>

<style scoped>

</style>
