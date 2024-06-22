import { BalanceService } from '../services/balance.service'

export const BalanceController = {
  async getBalance(req, res) {
    const { userId } = req.params

    try {
      const balance = await BalanceService.getBalance(userId)

      if (!balance) {
        return res.status(404).json({ message: 'Balance not found' })
      }

      return res.status(200).json({
        error: null,
        message: 'Balance retrieved successfully',
        data: balance
      })
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error in Balance.controller.js: getBalance - ' + error.message
      })
    }
  }
}
