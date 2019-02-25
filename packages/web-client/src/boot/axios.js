import axios from 'axios'
export const http = axios.create()

const flattenSuccess = response => response.data || {}

export default async ({ Vue }) => {
  http.interceptors.response.use(flattenSuccess)
  Vue.prototype.$axios = http
}
