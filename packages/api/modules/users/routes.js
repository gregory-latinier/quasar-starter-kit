const Handlers = require('./handlers')

const routes = []

routes.push([
  {
    method: 'GET',
    path: '/v1/users',
    handler: (req, h) => Handlers.loadUsers(req, h),
    options: {
      tags: ['users']
    }
  }
])

module.exports = routes
