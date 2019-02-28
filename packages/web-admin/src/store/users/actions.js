import axios from 'axios'

export const loadUsers = async (context, { page, rowsPerPage, sortBy, descending }) => {
  const response = await axios({
    headers: {
      'Accept': 'application/json'
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
