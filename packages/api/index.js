const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT || 5000
})

server.route({
  method: 'GET',
  path: '/hello',
  handler: (req,h) => {
    return h.response('hello world')
  }
})

const start =  async () => {
  try {
    await server.start()
  }
  catch (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Server running at:', server.info.uri)
}

start()
