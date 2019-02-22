const Handlers = require('./handlers')
const routes = []

routes.push([
  {
    method: 'POST',
    path: '/oauth/token',
    handler: (req, h) => Handlers.token(req, h),
    options: {
      tags: ['auth']
    }
  },
  {
    method: 'POST',
    path: '/oauth/revoke',
    handler: (req, h) => Handlers.revoke(req, h),
    options: {
      tags: ['auth']
    }
  },
  {
    method: 'GET',
    path: '/me',
    handler: (req, h) => Handlers.me(req, h),
    options: {
      tags: ['auth']
    }
  }
])

module.exports = routes