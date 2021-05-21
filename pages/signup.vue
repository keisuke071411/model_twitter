<template>
  <section class="box">
    <div class="box_contents">
      <div class="box_contents-title">
        <p>ユーザー登録</p>
      </div>
      <button class="box_contents-button" @click="googleSignUp"><img src="~/static/images/google.svg" alt="Googleでユーザー登録">Googleで登録</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useStore } from 'vuex'
import firebase, { auth } from '~/plugins/firebase'
import { useCookie } from "@vue-composable/cookie"

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const googleSignUp = async() => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        if (!res) throw Error;

        useCookie("isSignIn", 'true', { maxAge: 60 * 60 * 24 * 7　});
        router.push('/')
      } catch {
        alert('アカウント作成に失敗しました。再度お試しください。');
        return false
      }
    }
    return {
      googleSignUp,
    }
  },
})
</script>

<style lang="scss" scoped>
.box {
  background: $ui-back;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &_contents {
    width: 95%;
    max-width: 520px;
    height: 240px;
    padding: 32px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: $ui-sub;
    text-align: center;
    border-radius: 20px;
    box-shadow: 0px 0px 7px 0.5px $ui-border;
    &-title {
      margin-bottom: 40px;
      font-size: 24px;
    }
    &-button {
      width: 180px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid $ui-black;
      border-radius: 8px;
      text-decoration: none;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
  }
}
</style>
