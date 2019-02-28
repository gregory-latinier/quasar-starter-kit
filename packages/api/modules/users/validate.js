const Joi = require('joi')

const loadUsers = {
  query: {
    page: Joi.number().min(1).required(),
    limit: Joi.number().required().allow(10, 20, 50, 100),
    col: Joi.string().required().valid('username', 'createdAt'),
    dir: Joi.string().required().valid('asc', 'desc')
  }
}

const loadUser = {
  params: {
    id: Joi.string().min(1).required()
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

const saveUser = {
  payload: {
    _id: Joi.string().optional().allow(null),
    username: Joi.string().email().required(),
    password: Joi.string().optional().allow(null)
  }
}

module.exports = {
  loadUsers,
  loadUser,
  updateField,
  saveUser
}
