export const setAuth = (state, { username, accessToken, refreshToken }) => {
  state.username = username
  state.accessToken = accessToken
  state.refreshToken = refreshToken
}
