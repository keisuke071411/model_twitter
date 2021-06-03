<template>
  <main class="main">
    <section class="user">
      <div class="user_logo">
        <img src="~/static/images/logo.svg" alt="Hack'z Memo" />
      </div>
      <client-only v-if="currentUser">
        <div class="user_profile">
          <Profile :currentUser="currentUser" />
          <button class="button" @click="signOut">ログアウト</button>
        </div>
      </client-only>
    </section>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  useRoute,
  useRouter,
  useContext,
  useAsync,
  ref,
} from '@nuxtjs/composition-api'
import CurrentUser from '~/types/index'
import Profile from '~/components/ui/Profile.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Profile,
  },
  setup() {
    const { store, $fire } = useContext()
    const router = useRouter()
    const route = useRoute()
    const id: string = route.value.params.uid

    const currentUser = ref<CurrentUser>()

    useAsync(() => {
      $fire.firestore
        .collection('users')
        .doc(id)
        .get()
        .then((res) => {
          currentUser.value = res.data() as CurrentUser
        })
    })

    const test = ref('hoge')

    const signOut = async () => {
      await store.dispatch('auth/logout')
      router.push('/')
    }

    return {
      currentUser,
      signOut,
      test
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 0 90px;
  background: $ui-black;
  color: $font-white;
  .user {
    widows: 100%;
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
    &_profile {
      width: 820px;
      padding: 20px 8px;
      display: flex;
      justify-content: flex-start;
      border: 1px solid $ui-sub;
      &-img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
          object-fit: contain;
        }
      }
      &-name {
        font-size: 24px;
        font-weight: bold;
        font-family: $font-Montserrat;
      }
    }
  }
}
.button {
  width: 140px;
  height: 40px;
  margin-left: auto;
  margin-right: 20px;
  background: $ui-main;
  font-weight: bold;
  border-radius: 20px;
  align-self: flex-end;
  transition: 0.3s;
  &:hover {
    background: $ui-sub;
    color: $font-yellow;
  }
}
</style>
