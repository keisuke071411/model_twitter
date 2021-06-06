<template>
  <button @click="onClick" class="share">メモる</button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_, context) {
    const onClick = (): void => {
      context.emit('click')
    }

    return {
      onClick
    }
  },
})
</script>


<style lang="scss" scoped>
.share {
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
