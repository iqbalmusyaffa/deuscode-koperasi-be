import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSavingsBalance = async (data) => {
  const { user_id, balance, gold_balance } = data;
  try {
    const savingsBalance = await prisma.savings_Balance.create({
      data: {
        user_id,
        balance,
        gold_balance,
      },
    });
    return savingsBalance;
  } catch (error) {
    console.error('Error creating savings balance:', error);
    throw new Error('Failed to create savings balance');
  }
};

export const getSavingsBalanceByUserId = async (user_id) => {
  try {
    const savingsBalance = await prisma.savings_Balance.findUnique({
      where: { user_id },
    });
    return savingsBalance;
  } catch (error) {
    console.error('Error retrieving savings balance:', error);
    throw new Error('Failed to retrieve savings balance');
  }
};
