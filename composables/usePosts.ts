import { useContext, useAsync, ref } from '@nuxtjs/composition-api'
import { CurrentUser, PostData } from '~/types/index'

export const usePosts = () => {
  const { $fire } = useContext()

  const posts = ref<PostData[]>([])

  useAsync(async () => {
    try {
      const snapshot = await $fire.firestore
        .collection('post')
        .orderBy('created_at', 'desc')
        .get()

      // snapshotをPostDataの配列に変換
      const postList = snapshot.docs.map(
        (doc) => ({ ...doc.data() } as PostData)
      )

      // snapshotから、uidを取得し、firestoreからデータを取得
      const promiseList = snapshot.docs.map((doc) =>
        $fire.firestore.collection('users').doc(doc.data().uid).get()
      )

      // promiseListをPromise.allで同期処理し、usersに代入
      const users: CurrentUser[] = (await Promise.all(promiseList)).map(
        (doc) => ({ ...doc.data(), uid: doc.id } as CurrentUser)
      )

      console.log(users)

      // postListのデータとusersのデータを結合
      for (let i = 0; i < postList.length; i++) {
        postList[i].user = users[i]
      }

      posts.value = postList
    } catch (error) {
      alert(error.message)
    }
  })

  return { posts }
}
