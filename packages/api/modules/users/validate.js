const Joi = require('joi')

const loadUsers = {
  query: {
    page: Joi.number().min(1).required(),
    limit: Joi.number().required().allow(10, 20, 50, 100),
    col: Joi.string().required().allow('username', 'createdAt'),
    dir: Joi.string().required().allow('asc', 'desc')
  }
}

const updateField = {
  params: {
    id: Joi.string().required()
  },
  payload: {
    field: Joi.string().required().valid('username'),
    value: Joi.string().required()
  }
}

module.exports = {
  loadUsers,
  updateField
}
