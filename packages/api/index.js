require('dotenv').config()
const Hapi = require('hapi')
const MongoDB = require('./plugins/mongodb')
const Routes = require('./plugins/routes')

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 5000,
  routes: {
    cors: true
  }
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: async (req,h) => {
    const { User } = req.mongodb.models
    const users = await User.find({ }).lean()
    return h.response(users)
  }
})

const start =  async () => {
  try {
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
