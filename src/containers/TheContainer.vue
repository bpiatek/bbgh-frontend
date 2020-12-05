<template>
  <div class="c-app">
    <TheAlerts/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <transition name="fade" mode="out-in">
              <router-view :key="$route.path"></router-view>
            </transition>
          </CContainer>
        </main>
      </div>
      <TheFooter/>
    </CWrapper>
  </div>
</template>

<script>
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'
import TheAlerts from '@/containers/TheAlerts'

export default {
  name: 'TheContainer',
  components: {
    TheAlerts,
    TheHeader,
    TheFooter
  }
}
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
