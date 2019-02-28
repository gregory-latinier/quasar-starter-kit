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

module.exports = {
  loadUsers
}
