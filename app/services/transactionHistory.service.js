import prisma from '../utils/client.js'

class TransactionHistoryService {
  static async getTransactionHistory(userId) {
    const transactionHistory = await prisma.transactionHistory.findMany({
      where: {
        userId
      }
    })

    return transactionHistory
  }

  static async getAllTransactionHistory() {
    const transactionHistory = await prisma.transactionHistory.findMany()

    return transactionHistory
  }
}

export default TransactionHistoryService
