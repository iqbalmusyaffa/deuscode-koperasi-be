import {
  createLoanStatus,
  getLoanStatusById,
  updateLoanStatus,
  deleteLoanStatus,
  getLoanStatusByApplicationId,
  getAllLoanStatuses // Import the service function
} from '../services/loanStatus.service.js';

// Create Loan Status
export const createLoanStatusController = async (req, res) => {
  try {
    const loanStatus = await createLoanStatus(req.body);
    res.status(201).json(loanStatus);
  } catch (error) {
    console.error('Error in createLoanStatusController:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Loan Status by ID
export const getLoanStatusByIdController = async (req, res) => {
  try {
    const loanStatus = await getLoanStatusById(req.params.id);
    if (loanStatus) {
      res.status(200).json(loanStatus);
    } else {
      res.status(404).json({ error: 'Loan status not found' });
    }
  } catch (error) {
    console.error('Error in getLoanStatusByIdController:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update Loan Status
export const updateLoanStatusController = async (req, res) => {
  try {
    const loanStatus = await updateLoanStatus(req.params.id, req.body);
    res.status(200).json(loanStatus);
  } catch (error) {
    console.error('Error in updateLoanStatusController:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Loan Status
export const deleteLoanStatusController = async (req, res) => {
  try {
    await deleteLoanStatus(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteLoanStatusController:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Loan Status by Application ID
export const getLoanStatusByApplicationIdController = async (req, res) => {
  try {
    const loanStatus = await getLoanStatusByApplicationId(req.params.application_id);
    res.status(200).json(loanStatus);
  } catch (error) {
    console.error('Error in getLoanStatusByApplicationIdController:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Loan Statuses
export const getAllLoanStatusesController = async (req, res) => {
  try {
    const loanStatuses = await getAllLoanStatuses();
    res.status(200).json(loanStatuses);
  } catch (error) {
    console.error('Error in getAllLoanStatusesController:', error);
    res.status(500).json({ error: 'Failed to retrieve loan statuses', details: error.message });
  }
};