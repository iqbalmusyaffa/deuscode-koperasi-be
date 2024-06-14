import { UserService } from '../services/user.service.js'
import { jwt as JWT } from '../utils/jwt.js'
class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await UserService.findUnique(email)

      if (!user) {
        return res.status(404).json({
          error: 'Bad Request',
          message: 'User not found'
        })
      }

      const isPasswordValid = await UserService.comparePassword(
        password,
        user.password
      )
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Password is incorrect'
        })
      }

      const { password: _, ...userWithoutPassword } = user
      const accessToken = JWT.generateAccessToken(userWithoutPassword)
      const refreshToken = JWT.generateRefreshToken(userWithoutPassword)

      return res.status(200).json({
        error: null,
        message: 'User Logged In Successfully',
        data: {
          user,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Auth.controller.js: login - ' + error.message
      })
    }
  }

  static async register(req, res) {
    try {
      const {
        username,
        password,
        email,
        phone,
        profile_image,
        address,
        balance,
        statusId,
        roleId
      } = req.body

      // Validate request
      if (
        !username ||
        !password ||
        !email ||
        !phone ||
        !profile_image ||
        !address ||
        !balance ||
        !statusId ||
        !roleId
      ) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Request body incomplete'
        })
      }

      const existingUser = await UserService.findUnique(email)
      if (existingUser) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'User already exists'
        })
      }

      const hashedPassword = await UserService.hashPassword(password)
      const user = await UserService.createUser({
        username,
        password: hashedPassword,
        email,
        phone,
        profile_image,
        address,
        balance,
        statusId,
        roleId
      })

      const { password: _, ...userWithoutPassword } = user
      const accessToken = JWT.generateAccessToken(userWithoutPassword)
      const refreshToken = JWT.generateRefreshToken(userWithoutPassword)

      return res.status(201).json({
        error: null,
        message: 'User Registered Successfully',
        data: {
          user,
          accessToken,
          refreshToken
        }
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Auth.controller.js: register - ' + error.message
      })
    }
  }

  static async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Refresh token is required'
        })
      }

      const user = JWT.verifyRefreshToken(refreshToken)
      if (!user) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Invalid refresh token'
        })
      }

      const { password: _, ...userWithoutPassword } = user
      const accessToken = JWT.generateAccessToken(userWithoutPassword)
      const newRefreshToken = JWT.generateRefreshToken(userWithoutPassword)

      return res.status(200).json({
        error: null,
        message: 'Token Refreshed Successfully',
        data: {
          user,
          accessToken,
          refreshToken: newRefreshToken
        }
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Auth.controller.js: refreshToken - ' + error.message
      })
    }
  }

  static async checkAuth(req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Authorization header is required'
        })
      }

      const token = authorization.split(' ')[1]
      const user = JWT.verifyAccessToken(token)
      if (!user) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Invalid token'
        })
      }

      return res.status(200).json({
        error: null,
        message: 'User is authenticated',
        data: {
          user
        }
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error in Auth.controller.js: checkAuth - ' + error.message
      })
    }
  }
}

export default AuthController
