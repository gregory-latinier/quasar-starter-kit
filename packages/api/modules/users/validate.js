const Joi = require('joi')

const loadUsers = {
  query: {
    page: Joi.number().min(1).required(),
    limit: Joi.number().required().allow(10, 20, 50, 100),
    col: Joi.string().required().allow('username', 'createdAt'),
    dir: Joi.string().required().allow('asc', 'desc')
  }
}

module.exports = {
  loadUsers
}
