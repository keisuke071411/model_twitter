import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { CurrentUser } from '~/types/index'

export const state = () => ({
  isLogin: false as Boolean,
  currentUser: null,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  isLogin: (state) => state.isLogin,
}

export const mutations: MutationTree<RootState> = {
  SET_USER(state, payload) {
    state.isLogin = true
    state.currentUser = payload
  },

  RESET(state) {
    state.isLogin = false
    state.currentUser = null
  },
}

export const actions: ActionTree<RootState, RootState> = {
  onAuthStateChanged({ commit, getters }, { authUser }) {
    if (!authUser) {
      commit('RESET')
      return
    } else if (getters.isLogin) {
      return
    }

    commit('SET_USER', {
      uid: authUser.uid,
      displayName: authUser.displayName,
      imagePath: authUser.photoURL,
    } as CurrentUser)
  },
  async login({ commit }): Promise<void> {
    try {
      const provider = new this.$fireModule.auth.GoogleAuthProvider()
      const res = await this.$fire.auth.signInWithPopup(provider)

      if (!res) throw Error

      const currentUser: CurrentUser = {
        uid: res.user?.uid as string,
        displayName: res.user?.displayName as string,
        imagePath: res.user?.photoURL as string,
      }

      commit('SET_USER', currentUser)

      const user = await this.$fire.firestore.collection('user').doc(currentUser.uid).get()
      if (user.data()) return

      await this.$fire.firestore
        .collection('users')
        .doc(currentUser.uid)
        .set({
          uid: currentUser.uid as string,
          displayName: currentUser.displayName as string,
          imagePath: currentUser.imagePath as string,
        })
    } catch {
      return alert('アカウント作成に失敗しました。再度お試しください。')
    }
  },
  async logout({ commit }): Promise<void> {
    try {
      await this.$fire.auth.signOut()
      commit('RESET')
    } catch {
      return alert('ログアウトに失敗しました。再度お試しください。')
    }
  },
}
