import jwt from 'jsonwebtoken'
import { Cookies } from 'quasar'

export default async ({ ssrContext, store }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
  if (cookies.get('access_token')) {
    const token = jwt.decode(cookies.get('access_token'))
    if (token.scopes.includes('admin')) {
      store.commit('auth/setAuth', {
        username: token.username,
        accessToken: cookies.get('access_token'),
        refreshToken: cookies.get('refresh_token')
      })
    // This will prevent a client account to connect to the admin app
    } else {
      let domain = process.env.SERVER ? ssrContext.req.headers.host : window.location.hostname
      cookies.remove('access_token', { path: '/', domain })
      cookies.remove('refresh_token', { path: '/', domain })
    }
  }
}
