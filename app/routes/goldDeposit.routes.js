import express from 'express';
import GoldDepositController from '../controllers/GoldDeposit.controller.js';

const router = express.Router();

// Gold Deposit Routes
router.post('/gold-deposit', GoldDepositController.create);
router.get('/gold-deposit/:user_id', GoldDepositController.getByUserId);

export default router;
