import { UserService } from '../services/user.service.js'
import { StatusService } from '../services/status.service.js'
import { jwt as JWT } from '../utils/jwt.js'
import moment from 'moment'
import transporter from '../utils/mailer.js'
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

      const status = await StatusService.findUnique(1)
      if (user.status_id !== status.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'Account is not active'
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
        name,
        password,
        email,
        phone,
        profile_image,
        address,
        balance,
        roleId,
        nik,
        birth_date
      } = req.body

      // Validate request
      if (
        !name ||
        !password ||
        !email ||
        !phone ||
        !profile_image ||
        !address ||
        !balance ||
        !roleId ||
        !nik ||
        !birth_date
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

      const statusId = 2

      const hashedPassword = await UserService.hashPassword(password)
      const user = await UserService.createUser({
        email,
        password: hashedPassword,
        phone,
        status_id: statusId,
        role_id: roleId
      })

      // Format birthdate to ISO-8601 DateTime.
      const birthdate = moment(birth_date, 'YYYY-MM-DD HH:MI:SS').format()

      const userProfile = await UserService.createUserProfile({
        user_id: user.id,
        nik,
        name,
        profile_image,
        address,
        birth_date: birthdate
      })

      const userBalance = await UserService.createUserBalance({
        balance,
        user_id: user.id
      })

      const { password: _, ...userWithoutPassword } = user
      const accessToken = JWT.generateAccessToken(userWithoutPassword)
      const refreshToken = JWT.generateRefreshToken(userWithoutPassword)

      const userResponse = {
        ...userWithoutPassword,
        profile: userProfile,
        balance: userBalance
      }

      const mailOptions = {
        from: 'starbs.business@gmail.com',
        to: user.email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: http://127.0.0.1:3000/api/auth/verify-email?token=${accessToken}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error occurred: ' + error.message)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      return res.status(201).json({
        error: null,
        message: 'User Registered Successfully',
        data: {
          user: userResponse,
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

  static async verifyEmail(req, res) {
    const { token } = req.query

    try {
      const decoded = JWT.verifyAccessToken(token)
      const userId = decoded.id

      const user = await UserService.activateUser(userId)

      return res.status(200).json({
        error: null,
        message: 'Email Verified Successfully',
        data: {
          user
        }
      })
    } catch (error) {
      return res.status(400).json({
        error: 'Bad Request - ' + error.message,
        message: 'Invalid token'
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
