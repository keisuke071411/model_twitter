<template>
  <section class="box">
    <div class="box_contents">
      <div class="box_contents-title">
        <p>ログイン</p>
      </div>
      <button class="box_contents-button" @click="googleLogin"><img src="~/static/images/google.svg" alt="Googleでログイン">Googleでログイン</button>
      <nuxt-link to="/signup" class="box_contents-link">＞ 登録がお済みでない方</nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { store } = useContext()
    const router = useRouter()

    const googleLogin = async() => {
      await store.dispatch('auth/login')
      router.push('/')
    }
    return {
      googleLogin,
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
      transition: .3s;
      &:hover {
        box-shadow: 4px 4px 2px $ui-border;
      }
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
    &-link {
      margin-top: 40px;
      color: $font-sub;
      font-size: 12px;
      transition: .3s;
      &:hover {
        color: $font-yellow;
      }
    }
  }
}
</style>
