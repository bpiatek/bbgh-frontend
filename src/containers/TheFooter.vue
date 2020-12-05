<template>
  <CFooter :fixed="false">
    <div>
      <small>
        <a href="https://coreui.io" target="_blank">CoreUI</a>
        <span class="ml-1">&copy; {{new Date().getFullYear()}} creativeLabs.</span>
      </small>
    </div>
    <div class="mfs-auto">
      <small>
        <span class="mr-1" target="_blank">Powered by</span>
        <a href="https://coreui.io/vue">CoreUI for Vue</a>
      </small>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
