const plugin = {
  name: 'auth-jwt',
  register: async (server) => {
    server.register(require('hapi-auth-jwt2'))
    server.auth.strategy('jwt', 'jwt',
      {
        key: process.env.JWT_SECRET,
        validate: (decoded) => {
          if (!decoded) {
            return {
              isValid: false
            }
          }

          const returnObj = {
            isValid: true,
            credentials: {
              scope: decoded.scopes
            }
          }

          if (decoded.uid) returnObj.credentials.uid = decoded.uid
          if (decoded.username) returnObj.credentials.username = decoded.username

          return returnObj
        },
        verifyOptions: { algorithms: ['HS256'] }
      })
    server.auth.default('jwt')
  }
}

module.exports = plugin
