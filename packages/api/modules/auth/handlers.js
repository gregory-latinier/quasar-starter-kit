const Boom = require('boom')
const JWT = require('jsonwebtoken')
const { RefreshToken, User } = require('../../plugins/mongodb')

/**
 * Generate an access for the authenticated user
 *
 * @param {String} uid - user database ID
 * @param {String} username - username requested for the login
 * @param {Array} scopes - access levels granted to the user
 * @param {Number} expiresIn - the token expiration in days, default 30 days
 *
 * @returns jwt signed token
 * @author Grégory LATINIER
 */
const generateAccessToken = ({
  uid,
  username,
  scopes = ['user'],
  expiresIn = 30
}) => JWT.sign({
  uid,
  username,
  scopes
}, process.env.JWT_SECRET, {
  expiresIn: `${expiresIn} days`
})

/**
 * Generate a refresh token for the user
 *
 * @param {String} uid - user database ID
 *
 * @returns jwt signed token
 * @author Grégory LATINIER
 */
const generateRefreshToken = (uid) => JWT.sign({ uid }, process.env.JWT_SECRET)

/**
 * Sends an access and refresh tokens upon successful authentication
 *
 * @param req.payload.username {String} - user's username
 * @param req.payload.password {String} - user's password
 * @param h {Object} - response
 *
 * @returns server response object
 * @author Grégory LATINIER
 */
const token = async (req, h) => {
  const { grant_type: grantType } = req.payload
  if (grantType === 'password') {
    const user = await User.findOne({ username: req.payload.username })
    if (user && user.checkPassword(req.payload.password)) {
      const tokenData = {
        uid: user._id,
        username: user.username,
        scopes: user.scopes
      }

      const refreshToken = generateRefreshToken(user._id)

      await RefreshToken.create({
        token: refreshToken,
        user: user._id
      })

      return h.response({
        token_type: 'bearer',
        access_token: generateAccessToken(tokenData),
        expires_in: 30,
        refresh_token: refreshToken
      })
    }

    throw Boom.badData('auth.wrongUserPassword')
  } else if (grantType === 'refresh_token') {
    const { code } = req.payload
    let decoded
    try {
      decoded = JWT.verify(code, process.env.JWT_SECRET)
    } catch (e) {
      throw Boom.badData('auth.tokenInvalid')
    }
    const refreshToken = await RefreshToken.findOne({ token: code, user: decoded.uid }).populate('user')
    if (refreshToken) {
      const tokenData = {
        uid: refreshToken.user._id,
        username: refreshToken.user.username,
        scopes: refreshToken.user.scopes
      }
      return h.response({
        token_type: 'bearer',
        access_token: generateAccessToken(tokenData),
        expires_in: 30,
        refresh_token: code
      })
    }
    throw Boom.badData('auth.tokenRevoked')
  }
  throw Boom.badData('auth.wrongGrantType')
}

const revoke = async (req, h) => {
  // TODO
  return h.response()
}

const me = async (req, h) => {
  // TODO
  return h.response()
}

module.exports = {
  token,
  revoke,
  me
}
