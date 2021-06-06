<template>
  <button class="logout" @click="signOut">ログアウト</button>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const router = useRouter()

    const signOut = async (): Promise<void> => {
      if(confirm('本当にログアウトしますか？')) {
        await store.dispatch('auth/logout')
        router.push('/')
      }
    }

    return {
      signOut
    }
  },
})
</script>


<style lang="scss" scoped>
.logout {
  width: 140px;
  height: 40px;
  margin-left: auto;
  margin-right: 20px;
  background: $ui-main;
  font-weight: bold;
  align-self: flex-end;
  border-radius: 20px;
  transition: 0.3s;
  &:hover {
    background: $ui-sub;
    color: $font-yellow;
  }
}
</style>