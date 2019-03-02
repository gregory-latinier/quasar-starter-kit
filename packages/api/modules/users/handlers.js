const Crypto = require('crypto')
const Mongoose = require('mongoose')
const { User } = require('../../plugins/mongodb')

const loadUsers = async (req, h) => {
  const { page, limit, dir, col } = req.query
  const data = await User.find({
    scopes: { $elemMatch: { $eq: 'user' } }
  })
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .sort({ [col]: dir })
    .select('createdAt username firstName lastName')

  const total = await User.countDocuments({ scopes: { $elemMatch: { $eq: 'user' } } })
  return h.response({
    data,
    total
  })
}

const loadUser = async (req, h) => {
  const { id } = req.params
  const user = await User.findOne({
    _id: id,
    scopes: { $elemMatch: { $eq: 'user' } }
  })
    .select('username firstName lastName')
    .lean()
  return h.response(user)
}

const updateField = async (req, h) => {
  const { id } = req.params
  const { field, value } = req.payload
  await User.findOneAndUpdate({
    _id: id
  },
  {
    $set: { [field]: value }
  })
  return h.response({
    success: true
  })
}

const saveUser = async (req, h) => {
  const { _id, password, ...user } = req.payload
  if (!_id) {
    const result = await User.create({
      ...user,
      scopes: ['user']
    })
    return h.response({
      ...user,
      _id: result._id
    })
  } else {
    if (password) {
      const salt = Crypto.randomBytes(128).toString('hex')
      user.salt = salt
      user.hashedPassword = Crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    }
    const result = await User.findOneAndUpdate(
      { _id },
      { $set: user },
      { new: true }
    )

    return h.response({
      _id: result._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    })
  }
}

const isEmailUsed = async (req, h) => {
  return h.response(await User.countDocuments({
    _id: { $ne: Mongoose.Types.ObjectId(req.payload._id) },
    username: req.payload.username
  }))
}

module.exports = {
  loadUsers,
  loadUser,
  updateField,
  saveUser,
  isEmailUsed
}
