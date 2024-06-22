import express from 'express';
import {
  createLoanApplicationController,
  getLoanApplicationController,
  updateLoanApplicationController,
  deleteLoanApplicationController,
  getLoanStatusController,
  getAllLoanApplicationsController // Import the new controller
} from '../controllers/Pinjaman.controller.js';

const router = express.Router();

// Loan Application Routes
router.post('/loan-application/create', createLoanApplicationController);
router.get('/loan-application/:id', getLoanApplicationController);
router.put('/loan-application/update/:id', updateLoanApplicationController);
router.delete('/loan-application/delete/:id', deleteLoanApplicationController);
router.get('/loan-application', getAllLoanApplicationsController); // New route

// Loan Status Routes
router.get('/loan-status/:application_id', getLoanStatusController);

export default router;
