import { useContext, useAsync, ref } from '@nuxtjs/composition-api'
import { CurrentUser, PostData } from '~/types/index'

export const usePostsByUid = (id: string) => {
  const { $fire, $fireModule } = useContext()

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
        const postUserDoc = await $fire.firestore
          .collection('users')
          .doc(post.data().uid)
          .get()

        const user: CurrentUser = {
          uid: postUserDoc.data()?.uid,
          displayName: postUserDoc.data()?.displayName,
          imagePath: postUserDoc.data()?.imagePath,
        }

        const created_at = $fireModule.firestore.FieldValue.serverTimestamp()

        posts.value.push({
          post: post.data().post,
          user: user,
          created_at,
        })
      })
    } catch (error) {
      alert(error.message)
    }
  })


  return { posts, currentUser }
}
