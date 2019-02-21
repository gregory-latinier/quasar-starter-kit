const Glob = require('glob')
const Path = require('path')
const R = require('ramda')

const plugin = {
  name: 'routes',
  register: async (server) => {
    const routes = []
    Glob.sync('./modules/**/routes.js').forEach((file) => {
      routes.push(require(Path.resolve(file)))
    })
    server.route(R.flatten(routes))
  }
}

module.exports = plugin
