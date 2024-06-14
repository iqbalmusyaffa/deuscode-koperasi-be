import prisma from '../utils/client.js'
import Bcrypt from '../utils/bcrypt.js'
import { compare } from 'bcrypt'

export const UserService = {
  async getAll() {
    return await prisma.user.findMany()
  },

  async findUnique(email) {
    return await prisma.user.findUnique({ where: { email } })
  },

  async comparePassword(password, hashedPassword) {
    return await compare(password, hashedPassword)
  },

  async updateUser(email, name) {
    return await prisma.user.update({
      where: { email },
      data: { name }
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
