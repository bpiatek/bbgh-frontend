<template>
  <div class="c-app">
    <TheAlerts/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
              <router-view :key="$route.path"></router-view>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script lang="ts">
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import TheAlerts from './TheAlerts.vue'

export default {
  name: 'TheContainer',
  components: {
    TheAlerts,
    TheHeader,
    TheFooter
  },
  data () {
    return {
      scrollPositions: {}
    }
  },
  created () {
    this.onRouteChange()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scrollPositions[this.$route.name] = window.scrollY
    },
    onRouteChange () {
      const keep = ['Player', 'Mentions', 'Articles']
      if (keep.includes(this.$route.name)) {
        this.$nextTick(() => {
          const y = this.scrollPositions[this.$route.name]
          window.scrollTo(0, y || 0)
        })
      }
    }
  },
  watch: {
    '$route.name' () {
      this.onRouteChange()
    }
  }
}
</script>

<style scoped>
</style>
