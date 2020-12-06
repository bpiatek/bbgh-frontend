<template>
  <CHeader fixed with-subheader light>
    <CHeaderBrand class="mx-auto" to="/">
      Piłk<img src="/favicon.svg" alt="o" title="o">mentarz
    </CHeaderBrand>
    <CSubheader>
      <CHeaderNav class="m-auto">
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Mentions', query: listQuery($store.state.mentionsList)}" :class="{'c-active': $route.name === 'Mentions'}">
            {{ $t('Mentions') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Articles', query: listQuery($store.state.articlesList)}" :class="{'c-active': $route.name === 'Articles'}">
            {{ $t('Articles') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
    </CSubheader>
  </CHeader>
</template>

<script lang="ts">
import { ListData } from '@/store'

export default {
  name: 'TheHeader',
  components: {},
  methods: {
    listQuery (list: ListData<unknown>) {
      return { ...list.toQueryParameters(), ...{ scrollY: list.scrollPosition.y } }
    }
  }
}
</script>
