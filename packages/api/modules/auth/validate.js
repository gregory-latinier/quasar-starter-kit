const Joi = require('joi')

const token = {
  options: {
    abortEarly: false
  },
  payload: {
    username: Joi.string().email().required(),
    password: Joi.string().trim().required()
  }
}

module.exports = {
  token
}
