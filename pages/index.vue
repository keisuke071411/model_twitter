<template>
  <main class="main">
    <div class="logo">
      <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
    </div>
    <section class="memo">
      <div class="memo_main">
        <client-only v-if="currentUser">
          <Tabs :link="currentUser.uid" />
          <Post :currentUser="currentUser" />
        </client-only>
      </div>
      <client-only v-if="posts.length">
        <div class="memo_list">
          <Articles v-for="(post, i) in posts" :key="i" :post="post" />
        </div>
      </client-only>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext, computed } from '@nuxtjs/composition-api'
import { usePosts } from '~/composables/usePosts'
import Tabs from '~/components/ui/Tabs.vue'
import Post from '~/components/ui/Post.vue'
import Articles from '~/components/ui/Articles.vue'
import ShareButton from '~/components/button/ShareButton.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Tabs,
    Post,
    Articles,
    ShareButton
  },
  setup() {
    const { store } = useContext()
    const { posts } = usePosts()

    return {
      currentUser: computed(() => store.state.auth.currentUser),
      posts,
    }
  },
})
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 0 90px 50px;
  display: flex;
  justify-content: flex-start;
  background: $ui-black;
  color: $font-white;
  .logo {
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
  .memo {
    width: 820px;
    height: 100%;
    border: 1px solid $ui-sub;
    &_main {
      width: 100%;
      border-bottom: 1px solid $ui-sub;
    }
    &_list {
      width: 100%;
    }
  }
}
</style>
