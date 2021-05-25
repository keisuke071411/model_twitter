<template>
  <div class="profile">
    <!-- <div class="profile_img"><img :src="currentUser.imagePath" :alt="currentUser.displayName" /></div>
    <p class="profile_name">{{ currentUser.displayName }}</p> -->
    {{ currentUser }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import currentUser from '~/types/index'

export default defineComponent({
  porps: {
    currentUser: {
      type: Object as PropType<currentUser>
    }
  },
  setup() {
  },
})
</script>


<style lang="scss" scoped>
.profile {
  width: 820px;
  padding: 20px 8px;
  display: flex;
  justify-content: flex-start;
  border: 1px solid $ui-sub;
  &_img {
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
  &_name {
    font-size: 24px;
    font-weight: bold;
    font-family: $font-Montserrat;
  }
}
</style>
