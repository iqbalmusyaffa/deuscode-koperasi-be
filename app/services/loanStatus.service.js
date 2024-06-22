import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create Loan Status
export const createLoanStatus = async (data) => {
  const { application_id, name_status } = data;
  try {
    const loanStatus = await prisma.loan_Status.create({
      data: {
        application_id,
        name_status,
      },
    });
    return loanStatus;
  } catch (error) {
    console.error('Error creating loan status:', error);
    throw new Error('Failed to create loan status');
  }
};

// Get Loan Status by ID
export const getLoanStatusById = async (id) => {
  try {
    const loanStatus = await prisma.loan_Status.findUnique({
      where: { id: Number(id) },
    });
    return loanStatus;
  } catch (error) {
    console.error('Error retrieving loan status:', error);
    throw new Error('Failed to retrieve loan status');
  }
};

// Update Loan Status
export const updateLoanStatus = async (id, data) => {
  const { name_status } = data;
  try {
    const loanStatus = await prisma.loan_Status.update({
      where: { id: Number(id) },
      data: {
        name_status,
      },
    });
    return loanStatus;
  } catch (error) {
    console.error('Error updating loan status:', error);
    throw new Error('Failed to update loan status');
  }
};

// Delete Loan Status
export const deleteLoanStatus = async (id) => {
  try {
    await prisma.loan_Status.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error('Error deleting loan status:', error);
    throw new Error('Failed to delete loan status');
  }
};

// Get Loan Status by Application ID
export const getLoanStatusByApplicationId = async (application_id) => {
  try {
    const loanStatus = await prisma.loan_Status.findMany({
      where: { application_id: Number(application_id) },
    });
    return loanStatus;
  } catch (error) {
    console.error('Error retrieving loan status by application ID:', error);
    throw new Error('Failed to retrieve loan status by application ID');
  }
};

// Get All Loan Statuses
export const getAllLoanStatuses = async () => {
  try {
    const loanStatuses = await prisma.loan_Status.findMany();
    return loanStatuses;
  } catch (error) {
    console.error('Error retrieving loan statuses:', error);
    throw new Error('Failed to retrieve loan statuses');
  }
};