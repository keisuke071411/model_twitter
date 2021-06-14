import { useContext, useAsync, ref } from '@nuxtjs/composition-api'
import { CurrentUser, PostData } from '~/types/index'

export const usePostsByUid = (id: string) => {
  const { $fire } = useContext()

  const posts = ref<PostData[]>([])
  const currentUser = ref<CurrentUser>()

  useAsync(async (): Promise<void> => {
    try {
      const userDoc = await $fire.firestore
        .collection('users')
        .doc(id)
        .get()

      currentUser.value = userDoc.data() as CurrentUser

      const postDocs = await $fire.firestore
        .collection('post')
        .where('uid', '==', id)
        .orderBy('created_at', 'desc')
        .get()

      postDocs.forEach(async (post) => {
        posts.value.push({
          post: post.data().post,
          user: currentUser.value as CurrentUser,
          created_at: post.data().created_at,
        })
      })
    } catch (error) {
      alert(error.message)
    }
  })

  return { posts, currentUser }
}
