<template>
  <main class="main">
    <section class="memo">
      <div class="memo_logo">
        <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
      </div>
      <div class="memo_main">
        <client-only v-if="currentUser">
          <Tab :link="currentUser.uid" />
          <Post :currentUser="currentUser" />
        </client-only>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import Tab from '~/components/ui/Tab.vue'
import Post from '~/components/ui/Post.vue'
import ShareButton from '~/components/button/ShareButton.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Tab,
    Post,
    ShareButton
  },
  setup() {
    const { store, app } = useContext()

    return {
      currentUser: computed(() => store.state.auth.currentUser),
    }
  },
})
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 0 90px;
  background: $ui-black;
  color: $font-white;
  .memo {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    &_logo {
      width: 160px;
      height: 24px;
      margin-right: 24px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: contain;
      }
    }
    &_main {
      width: 820px;
      border: 1px solid $ui-sub;
    }
  }
}
</style>
