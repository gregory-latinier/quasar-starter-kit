const Crypto = require('crypto')
const { User } = require('../../plugins/mongodb')

const loadUsers = async (req, h) => {
  const { page, limit, dir, col } = req.query
  const data = await User.find({
    scopes: { $elemMatch: { $eq: 'user' } }
  })
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .sort({ [col]: dir })
    .select('createdAt username')

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
    .select('username')
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
  const { _id, username, password } = req.payload
  if (!_id) {
    const result = await User.create({
      username,
      scopes: ['user']
    })
    return {
      _id: result._id,
      username: result.username
    }
  } else {
    const data = { username }

    if (password) {
      const salt = Crypto.randomBytes(128).toString('hex')
      data.salt = salt
      data.hashedPassword = Crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    }
    const result = await User.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    )

    return {
      _id: result._id,
      username: result.username
    }
  }
}

module.exports = {
  loadUsers,
  loadUser,
  updateField,
  saveUser
}
