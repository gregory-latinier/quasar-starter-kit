const Joi = require('joi')

const token = {
  options: {
    abortEarly: false
  },
  payload: {
    grant_type: Joi.string().trim().allow('refresh_token', 'password'),
    username: Joi.string().trim().when('grant_type',
      {
        is: Joi.string().valid('password'),
        then: Joi.string().trim().required(),
        otherwise: Joi.string().forbidden()
      }),
    password: Joi.string().trim().when('grant_type',
      {
        is: Joi.string().valid('password'),
        then: Joi.string().trim().required(),
        otherwise: Joi.string().forbidden()
      }),
    code: Joi.string().trim().when('grant_type',
      {
        is: Joi.string().valid('refresh_token'),
        then: Joi.string().trim().required(),
        otherwise: Joi.string().forbidden()
      })
  }
}

module.exports = {
  token
}
