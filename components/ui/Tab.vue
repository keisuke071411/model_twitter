<template>
  <div class="tab">
    <nuxt-link to="/">HOME</nuxt-link>
    <nuxt-link :to="link">MY PAGE</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    link: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
  height: 54px;
  display: flex;
  border-bottom: 1px solid $ui-sub;
  a {
    width: 206px;
    height: 100%;
    text-align: center;
    line-height: 54px;
    color: $font-white;
    font-family: $font-Montserrat;
    border-right: 1px solid $ui-sub;
    text-decoration: none;
    &.nuxt-link-exact-active {
      background-color: $ui-main;
    }
  }
}
</style>
