const { User } = require('../../plugins/mongodb')

const loadUsers = async (req, h) => {
  const { page, limit, dir, col } = req.query
  const users = await User.find({
    scopes: { $elemMatch: { $eq: 'user' } }
  })
    .skip((page - 1) * parseInt(limit))
    .limit(parseInt(limit))
    .sort({ [col]: dir })
    .select('createdAt username')
  return h.response(users)
}

module.exports = {
  loadUsers
}
