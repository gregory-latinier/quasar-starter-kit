import axios from 'axios'
export const http = axios.create()

const flattenSuccess = response => response.data || {}
const flattenError = error => Promise.reject(error.response.data || {})

export default async ({ Vue }) => {
  http.interceptors.response.use(flattenSuccess, flattenError)
  Vue.prototype.$axios = http
}
