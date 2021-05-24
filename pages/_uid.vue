<template>
  <section class="user">
    {{ id }}
    {{ currentUser }}
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'
import { db } from "~/plugins/firebase"
import currentUser from '~/types/index'

export default defineComponent({
  setup() {
    const { params } = useContext()
    const id = params.value

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
        currentUser.imagePath = user?.photoURL as string
      }
    )

    return {
      id,
      currentUser
    }
  },
})
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  height: 100vh;
  background: $ui-black;
  color: $font-white;
}
</style>
