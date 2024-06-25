import bcrypt from 'bcrypt'
import { UserService } from '../services/user.service.js'
import { ProfileService } from '../services/profile.service.js'
import { StatusService } from '../services/status.service.js'

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll()

      // Get user profile and status details
      for (const user of users) {
        const profile = await ProfileService.findUser(user.id)
        user.profile = profile
      }

      for (const user of users) {
        const status = await StatusService.findUnique(user.status_id)
        user.status = status
      }

      return res.status(200).json({
        error: null,
        message: 'Get all users successfully',
        data: users
      })
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error in UserController.getAll - ' + error.message,
        data: null
      })
    }
  },

  async getProfile(req, res) {
    try {
      const email = req.user.email
      const user = await UserService.findUnique(email, {
        include: {
          User_Profile: true,
          User_Status: true // Include User_Status to fetch status details
        }
      })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  async updateUser(req, res) {
    try {
      const email = req.user.email
      const { name, status_id } = req.body // Accept status_ids in the request body
      const user = await UserService.updateUser(email, { name, status_id })
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  async updatePassword(req, res) {
    try {
      const email = req.user.email
      const { password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await UserService.updatePassword(email, hashedPassword)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default UserController
