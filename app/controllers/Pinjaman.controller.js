import {
  createLoanApplication,
  getLoanApplication,
  updateLoanApplication,
  deleteLoanApplication,
  getLoanStatus,
  getAllLoanApplications // Import the new service function
} from '../services/pinjaman.service.js';

// Create Loan Application
export const createLoanApplicationController = async (req, res) => {
  try {
    const loanApplication = await createLoanApplication(req.body);
    res.status(201).json(loanApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Loan Application by ID
export const getLoanApplicationController = async (req, res) => {
  try {
    const loanApplication = await getLoanApplication(req.params.id);
    if (loanApplication) {
      res.status(200).json(loanApplication);
    } else {
      res.status(404).json({ error: 'Loan application not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Loan Application
export const updateLoanApplicationController = async (req, res) => {
  try {
    const loanApplication = await updateLoanApplication(req.params.id, req.body);
    res.status(200).json(loanApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Loan Application
export const deleteLoanApplicationController = async (req, res) => {
  try {
    await deleteLoanApplication(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Loan Status by Application ID
export const getLoanStatusController = async (req, res) => {
  try {
    const loanStatus = await getLoanStatus(req.params.application_id);
    res.status(200).json(loanStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Loan Applications
export const getAllLoanApplicationsController = async (req, res) => {
  try {
    const loanApplications = await getAllLoanApplications();
    res.status(200).json(loanApplications);
  } catch (error) {
    console.error('Error in getAllLoanApplicationsController:', error);
    res.status(500).json({ error: 'Failed to retrieve loan applications', details: error.message });
  }
};

// Get All Loan Statuses
export const getAllLoanStatusesController = async (req, res) => {
  try {
    const loanStatuses = await prisma.loan_Status.findMany();
    res.status(200).json(loanStatuses);
  } catch (error) {
    console.error('Error in getAllLoanStatusesController:', error);
    res.status(500).json({ error: 'Failed to retrieve loan statuses', details: error.message });
  }
};
