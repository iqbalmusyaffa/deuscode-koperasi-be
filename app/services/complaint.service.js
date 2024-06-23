import prisma from '../utils/client.js'

export const createComplain = async (data) => {
  return await prisma.complaint.create({
    data: data
  })
}

export const getComplains = async () => {
  return await prisma.complaint.findMany()
}
