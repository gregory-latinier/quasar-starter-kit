import API from '@qsk/common/utils/api-wrapper'
import jwt from 'jsonwebtoken'
import { Cookies } from 'quasar'

export const login = async (context, data) => {
  try {
    const response = await API.call({
      context,
      method: 'POST',
      url: '/oauth/token',
      data
    })

    const { access_token: accessToken, refresh_token: refreshToken } = response
    const token = jwt.decode(accessToken)
    // Only users can connect to the app, it will prevent admin accounts to use the app
    if (token.scopes.includes('admin')) {
      let domain = window.location.hostname
      Cookies.set('access_token', accessToken, {
        path: '/',
        domain
      })
      Cookies.set('refresh_token', refreshToken, {
        path: '/',
        domain
      })
      context.commit('setAuth', {
        username: token.username,
        accessToken,
        refreshToken
      })
    } else {
      this.$q.notify('Not authorized')
    }
  } catch (err) {
    // TODO handle wrong username / password
    console.log(err)
  }
}

export const logout = async function (context) {
  await API.call({
    context,
    method: 'POST',
    url: '/oauth/revoke',
    data: {
      token: Cookies.get('refresh_token')
    }
  })
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  context.commit('clearAuth')
  // Not using an arrow function give us access to the '$router' thanks to 'this'
  this.$router.push({ path: '/' })
}
