const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const schema = new Schema({
  token: { type: String, unique: true, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
})

module.exports = {
  schema,
  collection: 'refresh-tokens'
}
