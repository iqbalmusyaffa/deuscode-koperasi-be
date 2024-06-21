import prisma from '../utils/client.js'
import Bcrypt from '../utils/bcrypt.js'
import { compare } from 'bcrypt'

export const UserService = {
  async getAll() {
    return await prisma.user.findMany()
  },

  async findByRole(role) {
    return await prisma.user.findMany({ where: { role } })
  },

  async findUnique(email) {
    return await prisma.user.findUnique({ where: { email } })
  },

  async comparePassword(password, hashedPassword) {
    return await compare(password, hashedPassword)
  },

  async createUser(data) {
    return await prisma.user.create({ data })
  },

  async createUserProfile(data) {
    return await prisma.user_Profile.create({ data })
  },

  async createUserBalance(data) {
    return await prisma.user_Balance.create({ data })
  },

  async hashPassword(password) {
    return await Bcrypt.encryptPassword(password)
  },

  async updateUser(id, name) {
    return await prisma.user.update({
      where: { id },
      data: { name }
    })
  },

  async activateUser(id) {
    return await prisma.user.update({
      where: { id },
      data: { status_id: 1 }
    })
  },

  async updatePassword(email, password) {
    const hashedPassword = await Bcrypt.encryptPassword(password)
    return await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })
  }
}
