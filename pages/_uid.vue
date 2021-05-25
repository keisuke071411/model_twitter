<template>
  <main class="main">
    <section class="user">
      <div class="user_logo"><img src="~/static/images/logo.svg" alt="Hack'z Memo" /></div>
      <div class="user_profile">
        <div class="user_profile-img"><img :src="currentUser.imagePath" :alt="currentUser.displayName" /></div>
        <p class="user_profile-name">{{ currentUser.displayName }}</p>
        <!-- <Profile :currentUser="currentUser" /> -->
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, useRoute } from '@nuxtjs/composition-api'
import { db } from "~/plugins/firebase"
import currentUser from '~/types/index'
import Profile from '~/components/ui/Profile.vue'

export default defineComponent({
  components: {
    Profile
  },
  setup() {
    const route = useRoute()
    const id: string = route.value.params.uid

    const currentUser: currentUser = reactive({
      uid: '',
      displayName: '',
      imagePath: ''
    })

    db.collection('users').doc(id).get()
      .then( res => {
        const user = res.data()

        currentUser.uid = user?.uid as string
        currentUser.displayName = user?.displayName as string,
        currentUser.imagePath = user?.imagePath as string
      }
    )

    return {
      currentUser
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
</style>
