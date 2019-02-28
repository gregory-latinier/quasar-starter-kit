import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Cookies } from 'quasar'

export const login = async (context, data) => {
  try {
    const response = await axios({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      url: `${process.env.API}/oauth/token`,
      method: 'post',
      data
    })

    const { access_token: accessToken, refresh_token: refreshToken } = response.data
    const token = jwt.decode(accessToken)
    // Only users can connect to the app, it will prevent admin accounts to use the app
    if (token.scopes.includes('admin')) {
      let domain = window.location.hostname
      domain = domain.substring(domain.lastIndexOf('.', domain.lastIndexOf('.') - 1) + 1)

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
