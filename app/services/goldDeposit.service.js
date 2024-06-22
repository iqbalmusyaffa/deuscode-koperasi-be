import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createGoldDeposit = async (data) => {
  const { user_id, amount, deposit_date } = data;
  try {
    const goldDeposit = await prisma.gold_Deposit.create({
      data: {
        user_id,
        amount,
        deposit_date,
      },
    });
    return goldDeposit;
  } catch (error) {
    console.error('Error creating gold deposit:', error);
    throw new Error('Failed to create gold deposit');
  }
};

export const getGoldDepositsByUserId = async (user_id) => {
  try {
    const goldDeposits = await prisma.gold_Deposit.findMany({
      where: { user_id },
    });
    return goldDeposits;
  } catch (error) {
    console.error('Error retrieving gold deposits:', error);
    throw new Error('Failed to retrieve gold deposits');
  }
};
