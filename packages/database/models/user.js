const crypto = require('crypto')
const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const schema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  firstName: { type: String },
  lastName: { type: String },
  salt: { type: String },
  hashedPassword: { type: String },
  scopes: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  deletedAt: { type: Date }
})

schema.methods.encryptPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

schema.methods.checkPassword = function (password) {
  return this.encryptPassword(password) === this.hashedPassword
}

module.exports = {
  schema,
  collection: 'users'
}
