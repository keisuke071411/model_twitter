import { Middleware } from '@nuxt/types'

const authenticated: Middleware = ({ store, redirect }) => {
  const isLogin = store.state.auth.isLogin
  
  if (!isLogin) {
    return redirect('/login')
  }
}

export default authenticated
