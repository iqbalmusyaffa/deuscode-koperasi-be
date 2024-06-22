import { createSavingsBalance, getSavingsBalanceByUserId } from '../services/savingsBalance.service.js';

class SavingsBalanceController {
  static async create(req, res) {
    try {
      const savingsBalance = await createSavingsBalance(req.body);
      res.status(201).json(savingsBalance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByUserId(req, res) {
    try {
      const savingsBalance = await getSavingsBalanceByUserId(req.params.user_id);
      res.status(200).json(savingsBalance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SavingsBalanceController;
