import prisma from '../utils/client.js'

export const ProfileService = {
  async getAll() {
    return await prisma.user_Profile.findMany()
  },
  async findUnique(id) {
    return await prisma.user_Profile.findUnique({
      where: { id }
    })
  },
  async findUser(user_id) {
    return await prisma.user_Profile.findFirst({
      where: { user_id }
    })
  },
  async createProfile(profile_name) {
    return await prisma.user_Profile.create({
      data: { profile_name }
    })
  },
  async updateProfile(profile_name, new_profile_name) {
    return await prisma.user_Profile.update({
      where: { profile_name },
      data: { profile_name: new_profile_name }
    })
  },
  async deleteProfile(profile_name) {
    return await prisma.user_Profile.delete({
      where: { profile_name }
    })
  }
}
