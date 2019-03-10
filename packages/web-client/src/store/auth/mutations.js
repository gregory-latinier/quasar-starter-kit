export const setAuth = (state, { username, accessToken, refreshToken }) => {
  state.username = username
  state.accessToken = accessToken
  state.refreshToken = refreshToken
}

export const clearAuth = (state) => {
  state.username = null
  state.accessToken = null
  state.refreshToken = null
}
