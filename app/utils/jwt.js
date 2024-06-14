import 'dotenv/config'
import jsonWebToken from 'jsonwebtoken'

export const jwt = {
  generateAccessToken(user) {
    return jsonWebToken.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn:
        process.env.ACCESS_TOKEN_EXPIRES != null
          ? String(process.env.ACCESS_TOKEN_EXPIRES)
          : '1800s'
    })
  },

  generateRefreshToken(user) {
    return jsonWebToken.sign(user, String(process.env.REFRESH_TOKEN_SECRET), {
      expiresIn:
        process.env.REFRESH_TOKEN_EXPIRES != null
          ? String(process.env.REFRESH_TOKEN_EXPIRES)
          : '30d'
    })
  },

  verifyAccessToken(token) {
    try {
      return jsonWebToken.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    } catch (error) {
      return null
    }
  },

  verifyRefreshToken(token) {
    try {
      return jsonWebToken.verify(
        token,
        String(process.env.REFRESH_TOKEN_SECRET)
      )
    } catch (error) {
      return null
    }
  }
}
