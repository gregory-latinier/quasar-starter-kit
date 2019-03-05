import API from 'src/utils/api-wrapper'

export const loadUsers = async (context, { page, rowsPerPage, sortBy, descending }) => {
  const response = await API.call({
    context,
    method: 'GET',
    url: `/v1/users?page=${page}&limit=${rowsPerPage}&col=${sortBy}&dir=${descending ? 'desc' : 'asc'}`
  })

  context.commit('setUsers', {
    users: response.data,
    pagination: {
      page,
      rowsPerPage,
      sortBy,
      descending,
      rowsNumber: response.total
    }
  })
}

export const updateField = async (context, form) => {
  const { id, ...data } = form
  const response = await API.call({
    context,
    method: 'POST',
    url: `/v1/users/field/${id}`,
    data
  })
  if (response.success) {
    context.commit('updateField', form)
  }
}

export const loadUser = async (context, id) =>
  API.call({
    context,
    method: 'GET',
    url: `/v1/users/${id}`
  })

export const saveUser = async (context) =>
  API.call({
    context,
    method: 'POST',
    url: '/v1/users'
  })

export const isEmailUsed = async (context, data) =>
  API.call({
    context,
    method: 'POST',
    url: '/v1/users/isemailused',
    data
  })
