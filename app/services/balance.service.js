import prisma from '../utils/client'

export const BalanceService = {
  async getBalance(userId) {
    const balance = await prisma.balance.findFirst({
      where: {
        userId
      }
    })

    return balance
  }
}
