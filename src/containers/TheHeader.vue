<template>
  <CHeader fixed with-subheader light>
    <CHeaderBrand class="mx-auto" to="/">
      Piłk<img src="/favicon.svg" alt="o" title="o">mentarz
    </CHeaderBrand>
    <CSubheader>
      <CHeaderNav class="m-auto">
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Mentions', query: this.$store.state.mentionsList.toQueryParameters()}" :class="{'c-active': $route.name === 'Mentions'}">
            {{ $t('Mentions') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Articles', query: this.$store.state.articlesList.toQueryParameters()}" :class="{'c-active': $route.name === 'Articles'}">
            {{ $t('Articles') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
    </CSubheader>
  </CHeader>
</template>

<script>
export default {
  name: 'TheHeader',
  components: {}
}
</script>
