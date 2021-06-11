<template>
  <main class="main">
    <section class="user">
      <div class="user_logo">
        <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
      </div>
      <div class="user_main">
        <client-only v-if="currentUser">
          <Tabs :link="currentUser.uid" />
          <Profile :currentUser="currentUser" />
        </client-only>
        <client-only v-if="posts.length">
          <Articles v-for="(post, i) in posts" :key="i" :post="post" />
        </client-only>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { usePostsByUid } from '~/composables/usePostsByUid'
import Profile from '~/components/ui/Profile.vue'
import Tabs from '~/components/ui/Tabs.vue'
import Articles from '~/components/ui/Articles.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Profile,
    Tabs,
    Articles
  },
  setup() {
    const route = useRoute()
    const id: string = route.value.params.uid

    const { posts, currentUser } = usePostsByUid(id)

    return {
      currentUser,
      posts
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  padding: 0 90px;
  background: $ui-black;
  color: $font-white;
  .user {
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
