<template>
  <section>
    <h1>Hello World!</h1>
    <client-only>
      <nuxt-link v-if="currentUser" :to="currentUser.uid"><img v-if="currentUser" :src="currentUser.imagePath" :alt="currentUser.displayName" /></nuxt-link>
    </client-only>
    <nuxt-link to="/login">ログイン</nuxt-link>
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup() {
    const { store } = useContext()

    return {
      currentUser: computed(() => store.state.auth.currentUser),
    }
  },
})
</script>

<style lang="scss">

</style>
