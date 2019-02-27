import axios from 'axios'

export const loadUsers = async (context, { page, limit, col, dir }) => {
  const response = await axios({
    headers: {
      'Accept': 'application/json'
    },
    method: 'GET',
    url: `${process.env.API}/v1/users?page=${page}&limit=${limit}&col=${col}&dir=${dir}`
  })

  context.commit('setUsers', {
    users: response.data,
    pagination: { page, limit, col, dir }
  })
}
