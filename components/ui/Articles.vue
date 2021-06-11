<template>
  <article class="article">
    <div class="article_content">
      <div class="article_content--user">
        <img :src="post.user.imagePath" :alt="post.user.displayName" />
        <p>{{ post.user.displayName }}</p>
      </div>
      <p class="article_content-post">{{ post.post }}</p>
    </div>
    <p class="article_cerated">{{ post.created_at }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { PostData } from '~/types/index'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<PostData>,
      required: true
    }
  },
})
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  min-height: 150px;
  padding: 20px 12px;
  border-bottom: 1px solid $ui-sub;
  &_content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &--user {
      width: 64px;
      height: 64px;
      display: flex;
      flex-flow: column;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        vertical-align: top;
        object-fit: contain;
        border-radius: 50%;
      }
    }
  }
  &_cerated {
    margin-top: 20px;
  }
}
</style>
