export const setUsers = (state, { users, pagination }) => {
  state.users = users
  state.pagination = pagination
}

export const updateField = (state, { id, field, value }) => {
  const idx = state.users.findIndex((u) => u._id === id)
  state.users = [
    ...state.users.slice(0, idx),
    {
      ...state.users[idx],
      [field]: value
    },
    ...state.users.slice(idx + 1)
  ]
}
