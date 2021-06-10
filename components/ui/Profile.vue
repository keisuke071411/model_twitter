<template>
  <div class="profile">
    <div class="profile_img"><img :src="currentUser.imagePath" :alt="currentUser.displayName" /></div>
    <p class="profile_name">{{ currentUser.displayName }}</p>
    <Logout />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { CurrentUser } from '~/types/index'
import Logout from '../button/Logout.vue'

export default defineComponent({
  components: { Logout },
  props: {
    currentUser: {
      type: Object as PropType<CurrentUser>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  padding: 20px 8px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid $ui-sub;
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
