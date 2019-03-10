import axios from 'axios'
import jwt from 'jsonwebtoken'
import { Cookies } from 'quasar'

export default class API {
  static async call ({ context, method, url, data }) {
    try {
      const headers = await API.prepareHeader(context)
      const response = await axios({
        headers,
        method,
        url: `${process.env.API}${url}`,
        data
      })
      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (err) {
      // TODO Error handling
      console.log(err)
    }
  }

  static async prepareHeader (context) {
    const headers = {
      'Accept': 'application/json'
    }
    const { accessToken, refreshToken } = context.rootState.auth
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken)
      // The access token has expired
      if (decodedToken.exp < Date.now() / 1000) {
        const response = await axios({
          headers,
          method: 'POST',
          url: `${process.env.API}/oauth/token`,
          data: {
            grant_type: 'refresh_token',
            code: refreshToken
          }
        })
        if (response.status === 200 && response.data) {
          const { access_token: accessToken, refresh_token: refreshToken } = response.data
          const token = jwt.decode(accessToken)
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
          headers['Authorization'] = accessToken
        } else {
          throw new Error('auth.accessTokenRenewError')
        }
      } else {
        headers['Authorization'] = accessToken
      }
    }
    return headers
  }
}
