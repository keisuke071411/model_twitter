<template>
  <main class="main">
    <section class="user">
      <div class="user_logo">
        <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
      </div>
      <div class="user_main">
        <client-only v-if="currentUser">
          <Tab :link="currentUser.uid" />
          <Profile :currentUser="currentUser" />
          <Article :postData="allPost.postData" />
        </client-only>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useContext,
  useAsync,
  ref,
  reactive
} from '@nuxtjs/composition-api'
import { CurrentUser, PostType } from '~/types/index'
import Profile from '~/components/ui/Profile.vue'
import Tab from '~/components/ui/Tab.vue'
import Article from '~/components/ui/Article.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Profile,
    Tab,
    Article
  },
  setup() {
    const { $fire } = useContext()
    const route = useRoute()
    const id: string = route.value.params.uid

    const currentUser = ref<CurrentUser>()
    
    const allPost = reactive<PostType>({
      postData: []
    })

    const postUser = reactive<CurrentUser>({
      uid: '',
      displayName: '',
      imagePath: '',
    })

    useAsync(() => {
      $fire.firestore
        .collection('users')
        .doc(id)
        .get()
        .then((res) => {
          currentUser.value = res.data() as CurrentUser
        })

      $fire.firestore.collection('post')
      .get()
      .then(res => {
        res.forEach(post => {
          $fire.firestore.collection('users').doc(post.data().uid).get()
          .then(res => {
            postUser.uid = res.data().uid,
            postUser.displayName = res.data().displayName
            postUser.imagePath = res.data().imagePath
          })
          if (post.data().uid === currentUser.value?.uid) {
            allPost.postData.push({
              post: post.data().post,
              user: postUser,
              created_at: post.data().created_at
            })
          }
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
      currentUser,
      allPost
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
