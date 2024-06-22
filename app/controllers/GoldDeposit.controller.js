import { createGoldDeposit, getGoldDepositsByUserId } from '../services/goldDeposit.service.js';

class GoldDepositController {
  static async create(req, res) {
    try {
      const goldDeposit = await createGoldDeposit(req.body);
      res.status(201).json(goldDeposit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByUserId(req, res) {
    try {
      const goldDeposits = await getGoldDepositsByUserId(req.params.user_id);
      res.status(200).json(goldDeposits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default GoldDepositController;
