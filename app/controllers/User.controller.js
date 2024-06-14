import bcrypt from 'bcrypt'
import { UserService } from '../services/user.service.js'

const UserController = {
  async getAll(req, res) {
    try {
      const users = await UserService.getAll()
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
      const user = await UserService.findUnique(email)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  async updateUser(req, res) {
    try {
      const email = req.user.email
      const { name } = req.body
      const user = await UserService.updateUser(email, name)
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
