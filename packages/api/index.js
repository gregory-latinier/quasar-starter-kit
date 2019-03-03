require('dotenv').config()

const Sentry = require('@sentry/node')
Sentry.init({ dsn: process.env.SENTRY_DSN })

const Hapi = require('hapi')
const AuthJWT = require('./plugins/auth-jwt')
const { plugin: MongoDB } = require('./plugins/mongodb')
const Routes = require('./plugins/routes')

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 5000,
  routes: {
    cors: true,
    validate: {
      failAction: (request, h, err) => {
        throw err
      }
    }
  }
})
server.ext('onPreResponse', (request, h) => {
  const response = request.response
  if (!response.isBoom) {
    return h.continue
  }
  // There is a validation error
  if (response.isJoi) {
    const errors = []
    response.details.forEach((error) => {
      errors.push({
        message: error.type,
        field: error.context.key
      })
    })
    const res = h.response(errors)
    res.statusCode = 400
    return res
  }

  // There is an unhandled exception
  if (response.isBoom) {
    console.log(response)
  }
  return h.continue
});
const start =  async () => {
  try {
    await server.register(AuthJWT)
    await server.register(MongoDB)
    await server.register(Routes)
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', server.info.uri)
}

start()
