import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const ContactService = {
  async createContact(data) {
    return await prisma.contact.create({ data })
  },

  async getAllContacts() {
    return await prisma.contact.findMany()
  },

  async getContactById(id) {
    return await prisma.contact.findUnique({ where: { id: Number(id) } })
  },

  async updateContact(id, data) {
    return await prisma.contact.update({
      where: { id: Number(id) },
      data
    })
  },

  async deleteContact(id) {
    return await prisma.contact.delete({ where: { id: Number(id) } })
  }
}
