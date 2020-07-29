<template>
  <div>
    <CAlert
      v-for="(alert, index) in $store.state.alerts"
      :key="index"
      :color="alert.type"
      closeButton
    >
      {{ alert.message }}
      <CProgress
        :max="alert.timeout"
        height="3px"
        color="danger"
        animate
      />
    </CAlert>
  </div>
</template>

<script>
export default {
  name: 'TheAlerts'
}
</script>

<style scoped>

</style>
