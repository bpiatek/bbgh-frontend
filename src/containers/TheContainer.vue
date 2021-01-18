<template>
  <div class="c-app">
    <VueSimpleContextMenu
      :options="$store.state.contextMenu.options"
      ref="contextMenu"
      elementId="contextMenu"
      @option-clicked="$store.state.contextMenu.handler"
    />
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
import VueSimpleContextMenu from 'vue-simple-context-menu'

export default {
  name: 'TheContainer',
  components: {
    TheAlerts,
    TheHeader,
    TheFooter,
    VueSimpleContextMenu
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
    },
    '$store.state.contextMenu' () {
      if (this.$store.state.contextMenu.event) {
        this.$refs.contextMenu.showMenu(this.$store.state.contextMenu.event)
      }
    }
  }
}
</script>

<style scoped>
</style>
