import { GetterTree, MutationTree, ActionTree } from 'vuex';

export const state = () => ({
  isAuth: false as Boolean
})

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  login: state => state.isAuth,
}

export const mutations: MutationTree<RootState> = {
  INIT(state) {
    state.isAuth = false
  },

  SET(state) {
    state.isAuth = true
  },

  RESET(state) {
    state.isAuth = false
  },
}

export const actions: ActionTree<RootState, RootState> = {
  init({ commit }) {
    commit('RESET')
  },
  login({ commit }) {
    commit('SET')
  },
  logout({ commit }) {
    commit('RESET')
  }
}
