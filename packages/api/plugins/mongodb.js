const Mongoose = require('mongoose')
const Glob = require('glob')
const Path = require('path')
const ChangeCase = require('change-case')
const models = {}

Mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  })

Glob.sync('../database/models/**/*.js').forEach((file) => {
  const { name } = Path.parse(file)
  const model = require(Path.resolve(file))
  models[ChangeCase.pascalCase(name)] = Mongoose.model(ChangeCase.pascalCase(name), model.schema, model.collection)
})

const plugin = {
  name: 'mongodb',
  register: async (server) => {
    server.decorate('request', 'mongodb', {
      connection: Mongoose.connection,
      models
    })
  }
}

module.exports = {
  ...models,
  plugin
}
