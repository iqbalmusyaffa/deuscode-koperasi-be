import express from 'express';
import FundTransferController from '../controllers/FundTransfer.controller.js';

const router = express.Router();

// Fund Transfer Route
router.post('/transfer', FundTransferController.transfer);

// Get All Fund Transfers Route
router.get('/transfers', FundTransferController.getAll);

export default router;
