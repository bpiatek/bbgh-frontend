<template>
  <div class="c-app">
    <TheAlerts/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body">
        <main class="c-main">
          <CContainer fluid>
            <keep-alive>
              <router-view :key="$route.path"></router-view>
            </keep-alive>
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
</style>
