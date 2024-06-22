import express from 'express';
import SavingsBalanceController from '../controllers/SavingsBalance.controller.js';

const router = express.Router();

// Savings Balance Routes
router.post('/savings-balance', SavingsBalanceController.create);
router.get('/savings-balance/:user_id', SavingsBalanceController.getByUserId);

export default router;
