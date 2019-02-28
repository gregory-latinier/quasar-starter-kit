const Handlers = require('./handlers')
const Validate = require('./validate')

const routes = []

routes.push([
  {
    method: 'GET',
    path: '/v1/users',
    handler: (req, h) => Handlers.loadUsers(req, h),
    options: {
      tags: ['users'],
      validate: Validate.loadUsers
    }
  },
  {
    method: 'GET',
    path: '/v1/users/{id}',
    handler: (req, h) => Handlers.loadUser(req, h),
    options: {
      tags: ['users'],
      validate: Validate.loadUser
    }
  },
  {
    method: 'POST',
    path: '/v1/users/field/{id}',
    handler: (req, h) => Handlers.updateField(req, h),
    options: {
      tags: ['users'],
      validate: Validate.updateField
    }
  },
  {
    method: 'POST',
    path: '/v1/users',
    handler: (req, h) => Handlers.saveUser(req, h),
    options: {
      tags: ['users'],
      validate: Validate.saveUser
    }
  }
])

module.exports = routes
