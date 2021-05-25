<template>
  <section>
    <h1>Hello World!</h1>
    {{ currentUser }}
    <img v-if="currentUser" :src="currentUser.imagePath" :alt="currentUser.displayName" />
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()

    return {
      currentUser: computed(() => store.state.auth.currentUser)
    }
  },
})
</script>

<style lang="scss">

</style>
