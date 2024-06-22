import { transferFunds, getAllFundTransfers } from '../services/fundTransfer.service.js';

class FundTransferController {
  static async transfer(req, res) {
    try {
      const fundTransfer = await transferFunds(req.body);
      res.status(201).json(fundTransfer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const fundTransfers = await getAllFundTransfers();
      res.status(200).json(fundTransfers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // ... existing methods ...
}

export default FundTransferController;
