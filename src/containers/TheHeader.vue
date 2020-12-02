<template>
  <CHeader fixed with-subheader light>
<!--    <CToggler-->
<!--      in-header-->
<!--      class="d-lg-none"-->
<!--      @click="$store.commit('toggleSidebarMobile')"-->
<!--    />-->
<!--    <CToggler-->
<!--      in-header-->
<!--      class="d-md-down-none"-->
<!--      @click="$store.commit('toggleSidebarDesktop')"-->
<!--    />-->
    <CHeaderBrand class="mx-auto" to="/">
      Piłkomentarz
    </CHeaderBrand>
    <CSubheader>
      <CHeaderNav class="m-auto">
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink to="/mentions" :class="{'c-active': $route.name === 'Mentions'}">
            {{ $t('Mentions') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink to="/articles" :class="{'c-active': $route.name === 'Articles'}">
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
