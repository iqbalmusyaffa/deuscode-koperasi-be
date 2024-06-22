import TransactionHistoryService from '../services/transactionHistory.service.js'

class TransactionHistoryController {
  static async getTransactionHistory(req, res) {
    const { userId } = req.params

    try {
      const transactionHistory =
        await TransactionHistoryService.getTransactionHistory(userId)

      res.status(200).json({
        error: null,
        message: 'Successfully retrieved transaction history',
        data: transactionHistory
      })
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message:
          'Error in TransactionHistory.controller.js: getTransactionHistory - ' +
          error.message,
        data: null
      })
    }
  }

  static async getAllTransactionHistory(req, res) {
    try {
      const transactionHistory =
        await TransactionHistoryService.getAllTransactionHistory()

      res.status(200).json({
        error: null,
        message: 'Successfully retrieved all transaction history',
        data: transactionHistory
      })
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message:
          'Error in TransactionHistory.controller.js: getAllTransactionHistory - ' +
          error.message,
        data: null
      })
    }
  }
}

export default TransactionHistoryController
