import { useContext, useAsync, ref } from '@nuxtjs/composition-api'
import { CurrentUser, PostData } from '~/types/index'

export const usePosts = () => {
  const { $fire } = useContext()

  const posts = ref<PostData[]>([])

  useAsync(async (): Promise<void> => {
    try {
      const snapshot = await $fire.firestore
        .collection('post')
        .orderBy('created_at', 'desc')
        .get()

      const postDocs = snapshot.docs.map( async (post) => {
        const id = post.data().uid
        const res = await $fire.firestore
          .collection('users')
          .doc(id)
          .get()

        const user: CurrentUser = {
          uid: res.data()?.uid,
          displayName: res.data()?.displayName,
          imagePath: res.data()?.imagePath,
        }

        posts.value.push({
          post: post.data().post,
          user: user,
          created_at: post.data().created_at
        })
      })
    } catch (error) {
      alert(error.message)
    }
  })

  return { posts }
}
