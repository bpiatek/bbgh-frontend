<template>
  <CHeader fixed with-subheader light>
    <CHeaderBrand class="mx-auto" href="/">
      Piłk<img src="/favicon.svg" alt="o" title="o">mentarz
    </CHeaderBrand>
    <CSubheader>
      <CHeaderNav class="m-auto">
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Mentions'}" :class="{'c-active': $route.name === 'Mentions'}">
            {{ $t('Mentions') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink :to="{name: 'Articles'}" :class="{'c-active': $route.name === 'Articles'}">
            {{ $t('Articles') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <CHeaderNavLink
            :to="$store.state.lastPlayerId ? `/players/${$store.state.lastPlayerId}` : '/players'"
            :class="{'c-active': ['Players', 'Player'].includes($route.name)}"
          >
            {{ $t('Players') }}
          </CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
    </CSubheader>
  </CHeader>
</template>

<script lang="ts">
import { List } from '@/model/list'

export default {
  name: 'TheHeader',
  components: {},
  methods: {}
}
</script>
