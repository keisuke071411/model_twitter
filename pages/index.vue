<template>
  <main class="main">
    <div class="logo">
      <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
    </div>
    <section class="memo">
      <div class="memo_main">
        <client-only v-if="currentUser">
          <Tab :link="currentUser.uid" />
          <Post :currentUser="currentUser" />
        </client-only>
      </div>
      <client-only>
        <Article :postData="allPost.postData" />
      </client-only>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext, computed, useAsync, reactive } from '@nuxtjs/composition-api'
import { CurrentUser, PostType } from '~/types/index'
import Tab from '~/components/ui/Tab.vue'
import Post from '~/components/ui/Post.vue'
import Article from '~/components/ui/Article.vue'
import ShareButton from '~/components/button/ShareButton.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Tab,
    Post,
    Article,
    ShareButton
  },
  setup() {
    const { store, $fire } = useContext()

    const allPost = reactive<PostType>({
      postData: []
    })

    const postUser = reactive<CurrentUser>({
      uid: '',
      displayName: '',
      imagePath: '',
    })

    useAsync(() => {
      $fire.firestore.collection('post')
      .get()
      .then(res => {
        res.forEach(post => {
          $fire.firestore.collection('users').doc(post.data().uid).get()
          .then(res => {
            console.log(res.data())
            postUser.uid = res.data().uid,
            postUser.displayName = res.data().displayName
            postUser.imagePath = res.data().imagePath
          })
          allPost.postData.push({
            post: post.data().post,
            user: postUser,
            created_at: post.data().created_at
          })
        })

        allPost.postData.sort((a, b) => {
          if (a.created_at < b.created_at) {
            return 1
          } else if (a.created_at > b.created_at) {
            return -1
          } else {
            return 0
          }
        })
      })
    })

    return {
      currentUser: computed(() => store.state.auth.currentUser),
      allPost
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
  }
}
</style>
