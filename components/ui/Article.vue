<template>
  <div class="article">
    <article class="article_card" v-for="(postItem, i) in postData" :key="i">
      <div class="article_card-content">
        <div class="article_card-content--user">
          <img :src="postItem.user.imagePath" :alt="postItem.user.displayName" />
          <p>{{ postItem.user.displayName }}</p>
        </div>
        <p class="article_card-post">{{ postItem.post }}</p>
      </div>
      <p class="article_card-cerated">{{ postItem.created_at }}</p>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { PostType } from '~/types/index'

export default defineComponent({
  props: {
    postData: {
      type: [] as PropType<PostType[]>,
      required: true
    }
  },
  setup() {
    
  },
})
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  &_card {
    width: 100%;
    min-height: 150px;
    padding: 20px 12px;
    border-bottom: 1px solid $ui-sub;
    &-content {
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
          border: 2px solid $ui-main;
          border-radius: 50%;
        }
      }
    }
    &-cerated {
      margin-top: 20px;
    }
  }
}
</style>
