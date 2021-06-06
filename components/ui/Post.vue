<template>
  <div class="post">
    <div class="post-img">
      <img :src="currentUser.imagePath" :alt="currentUser.displayName" />
    </div>
    <textarea
      class="post_area"
      placeholder="思いの丈を書きやがれ。"
      maxlength="140"
      cols="40"
      rows="5"
      wrap="hard"
      v-model="text"
    />
    <ShareButton @click="PostMemo" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, useContext } from '@nuxtjs/composition-api'
import CurrentUser from '~/types/index'
import ShareButton from '~/components/button/ShareButton.vue'

export default defineComponent({
  components: {
    ShareButton
  },
  props: {
    currentUser: {
      type: Object as PropType<CurrentUser>,
      required: true,
    },
  },
  setup(props) {
    const text = ref<String>()
    const { app } = useContext()

    const PostMemo = async(): Promise<void> => {
      try {
        await app.$fire.firestore.collection('post').doc().set({
          uid: props.currentUser.uid,
          post: text.value,
        })

        text.value = ''
      } catch {
        return alert('投稿に失敗しました。再度お試しください。')
      }
    }

    return {
      PostMemo,
      text
    }
  },
})
</script>


<style lang="scss" scoped>
.post {
  width: 100%;
  padding: 20px 8px;
  display: flex;
  &-img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
      object-fit: contain;
    }
  }
  &_area {
    width: 100%;
    color: $font-white;
    resize: none;
  }
}
</style>
