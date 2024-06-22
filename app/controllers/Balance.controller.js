import { BalanceService } from '../services/balance.service.js'

class BalanceController {
  static async getBalance(req, res) {
    const { userId } = req.params

    try {
      const balance = await BalanceService.getBalance(userId)

      res.status(200).json({
        error: null,
        message: 'Successfully retrieved balance',
        data: balance
      })
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message:
          'Error in Balance.controller.js: getBalance - ' + error.message,
        data: null
      })
    }
  }
}

export default BalanceController
