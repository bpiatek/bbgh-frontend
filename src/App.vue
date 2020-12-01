<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      const mobile = window.innerWidth < 992
      if (this.$store.state.mobile !== mobile) {
        this.$store.commit('setMobile', mobile)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
