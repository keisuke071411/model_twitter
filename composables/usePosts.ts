import { useContext, useAsync, ref } from '@nuxtjs/composition-api'
import { CurrentUser, PostData } from '~/types/index'

export const usePosts = () => {
  const { $fire } = useContext()

  const posts = ref<PostData[]>([])

  useAsync(async (): Promise<void> => {
    try {
      const docs = await $fire.firestore
        .collection('post')
        .orderBy('created_at', 'desc')
        .get()
  
      docs.forEach(async (post) => {
        const res = await $fire.firestore
        .collection('users')
        .doc(post.data().uid)
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
