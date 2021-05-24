import { GetterTree, MutationTree, ActionTree } from 'vuex'
import firebase, { auth } from '~/plugins/firebase'
import currentUser from '~/types/index'

export const state = () => ({
  isLogin: false as Boolean,
  currentUser: null
})

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  login: state => state.isLogin,
}

export const mutations: MutationTree<RootState> = {
  INIT(state) {
    state.isLogin = false
    state.currentUser = null
  },
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
  init({ commit }) {
    commit('INIT')
  },
  async login({ commit }): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider)

      if (!res) throw Error;

      const currentUser: currentUser = {
        uid: res.user?.uid as string,
        displayName: res.user?.displayName as string,
        imagePath: res.user?.photoURL as string
      }

      commit('SET_USER', currentUser)
    } catch {
      return alert('アカウント作成に失敗しました。再度お試しください。');
    }
  },
  async signup({ commit }): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider)

      if (!res) throw Error;

      const currentUser: currentUser = {
        uid: res.user?.uid as string,
        displayName: res.user?.displayName as string,
        imagePath: res.user?.photoURL as string
      }

      await firebase.firestore().collection('users').doc(currentUser.uid).set({
        uid: currentUser.uid as string,
        displayName: currentUser.displayName as string,
        imagePath: currentUser.imagePath as string
      })

      commit('SET_USER', currentUser)
    } catch {
      return alert('アカウント作成に失敗しました。再度お試しください。');
    }
  },
  async logout({ commit }): Promise<void> {
    try {
      await auth.signOut()
      commit('RESET')
    } catch {
      return alert('ログアウトに失敗しました。再度お試しください。');
    }
  }
}
