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
} from '@nuxtjs/composition-api'
import CurrentUser from '~/types/index'
import Profile from '~/components/ui/Profile.vue'
import Tab from '~/components/ui/Tab.vue'

export default defineComponent({
  middleware: 'authenticated',
  components: {
    Profile,
    Tab
  },
  setup() {
    const { $fire } = useContext()
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

    return {
      currentUser,
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
