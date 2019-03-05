import axios from 'axios'
import jwt from 'jsonwebtoken'

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
    }
  }

  static async prepareHeader (context) {
    const headers = {
      'Accept': 'application/json'
    }
    const { accessToken } = context.rootState.auth
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken)
      // The access token has expired
      if (decodedToken.exp < Date.now() / 1000) {
        // TODO Token renewal
      } else {
        headers['Authorization'] = accessToken
      }
    }
    return headers
  }
}
