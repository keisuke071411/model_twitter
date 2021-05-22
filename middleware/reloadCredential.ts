import { Middleware } from '@nuxt/types'

const reloadCredential: Middleware = ({ store, redirect, route }) => {
  const isLogin = store.state.auth.isLogin
  const path = route.path

  if (!isLogin && path !== '/signup' && path !== '/login') {
    // return redirect('/login')
  }
}

export default reloadCredential
