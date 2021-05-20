import { useCookie } from "@vue-composable/cookie"

export default async ({ store, redirect, $cookies, route }) => {
  let { cookie } = useCookie("isSignIn", 'false', { maxAge: 60 * 60 * 24 * 7　});
  const path = route.path
  const isAuth = false

  if (!isAuth && path !== '/signup') {
    if (cookie.value === 'false') {
      return redirect('/login')
    } else {
      return true
    }
  } 
}
