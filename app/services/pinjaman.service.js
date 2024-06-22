import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create Loan Application
export const createLoanApplication = async (data) => {
  const { user_id, amount, application_date, status } = data;
  try {
    const loanApplication = await prisma.loan_Application.create({
      data: {
        user_id,
        amount,
        application_date,
        status,
      },
    });
    return loanApplication;
  } catch (error) {
    console.error('Error creating loan application:', error); // Logging error
    throw new Error('Failed to create loan application');
  }
};

// Get Loan Application by ID
export const getLoanApplication = async (id) => {
  try {
    const loanApplication = await prisma.loan_Application.findUnique({
      where: { id: Number(id) },
    });
    return loanApplication;
  } catch (error) {
    throw new Error('Failed to retrieve loan application');
  }
};

// Update Loan Application
export const updateLoanApplication = async (id, data) => {
  const { amount, status } = data;
  try {
    const loanApplication = await prisma.loan_Application.update({
      where: { id: Number(id) },
      data: {
        amount,
        status,
      },
    });
    return loanApplication;
  } catch (error) {
    throw new Error('Failed to update loan application');
  }
};

// Delete Loan Application
export const deleteLoanApplication = async (id) => {
  try {
    await prisma.loan_Application.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error('Failed to delete loan application');
  }
};

// Get Loan Status by Application ID
export const getLoanStatus = async (application_id) => {
  try {
    const loanStatus = await prisma.loan_Status.findMany({
      where: { application_id: Number(application_id) },
    });
    return loanStatus;
  } catch (error) {
    throw new Error('Failed to retrieve loan status');
  }
};

// Get All Loan Applications
export const getAllLoanApplications = async () => {
  try {
    const loanApplications = await prisma.loan_Application.findMany();
    return loanApplications;
  } catch (error) {
    console.error('Error retrieving loan applications:', error);
    throw new Error('Failed to retrieve loan applications');
  }
};
