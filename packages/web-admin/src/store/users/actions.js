import axios from 'axios'

export const loadUsers = async (context, { page, rowsPerPage, sortBy, descending }) => {
  const response = await axios({
    headers: {
      'Accept': 'application/json',
      'Authorization': context.rootState.auth.accessToken
    },
    method: 'GET',
    url: `${process.env.API}/v1/users?page=${page}&limit=${rowsPerPage}&col=${sortBy}&dir=${descending ? 'desc' : 'asc'}`
  })

  context.commit('setUsers', {
    users: response.data.data,
    pagination: {
      page,
      rowsPerPage,
      sortBy,
      descending,
      rowsNumber: response.data.total
    }
  })
}

export const updateField = async (context, form) => {
  const { id, ...data } = form
  const response = await axios({
    headers: {
      'Accept': 'application/json',
      'Authorization': context.rootState.auth.accessToken
    },
    method: 'POST',
    url: `${process.env.API}/v1/users/field/${id}`,
    data
  })
  if (response.data.success) {
    context.commit('updateField', form)
  }
}

export const loadUser = async (context, id) => {
  const response = await axios({
    headers: {
      'Accept': 'application/json',
      'Authorization': context.rootState.auth.accessToken
    },
    method: 'GET',
    url: `${process.env.API}/v1/users/${id}`
  })
  return response.data
}

export const saveUser = async (context, data) => {
  const response = await axios({
    headers: {
      'Accept': 'application/json',
      'Authorization': context.rootState.auth.accessToken
    },
    method: 'POST',
    url: `${process.env.API}/v1/users`,
    data
  })
  return response.data
}
