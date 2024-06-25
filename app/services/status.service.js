import prisma from '../utils/client.js'

export const StatusService = {
  async getAll() {
    return await prisma.user_Status.findMany()
  },
  async findUnique(id) {
    return await prisma.user_Status.findUnique({
      where: { id }
    })
  },
  async findUser(user_id) {
    return await prisma.user_Status.findFirst({
      where: { user_id }
    })
  },
  async createStatus(status_name) {
    return await prisma.user_Status.create({
      data: { status_name }
    })
  },
  async updateStatus(status_name, new_status_name) {
    return await prisma.user_Status.update({
      where: { status_name },
      data: { status_name: new_status_name }
    })
  },
  async deleteStatus(status_name) {
    return await prisma.user_Status.delete({
      where: { status_name }
    })
  }
}
