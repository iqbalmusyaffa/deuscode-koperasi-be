import express from 'express';
import {
  createLoanStatusController,
  getLoanStatusByIdController,
  updateLoanStatusController,
  deleteLoanStatusController,
  getLoanStatusByApplicationIdController,
  getAllLoanStatusesController
} from '../controllers/LoanStatus.controller.js';

const router = express.Router();

// Loan Status Routes
router.post('/loan-status/create', createLoanStatusController);
router.get('/loan-status/:id', getLoanStatusByIdController);
router.put('/loan-status/update/:id', updateLoanStatusController);
router.delete('/loan-status/delete/:id', deleteLoanStatusController);
router.get('/loan-status/application/:application_id', getLoanStatusByApplicationIdController);
router.get('/loan-statuses', getAllLoanStatusesController); // New route

export default router;
