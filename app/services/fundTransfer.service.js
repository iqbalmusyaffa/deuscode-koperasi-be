import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const transferFunds = async (transferData) => {
  const { sender_id, receiver_id, amount, description } = transferData;
  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Check sender's balance
      const senderBalance = await prisma.user_Balance.findUnique({
        where: { user_id: sender_id },
      });

      if (!senderBalance || senderBalance.balance < amount) {
        throw new Error('Insufficient balance');
      }

      // Deduct amount from sender's balance
      await prisma.user_Balance.update({
        where: { user_id: sender_id },
        data: { balance: { decrement: amount } },
      });

      // Add amount to receiver's balance
      await prisma.user_Balance.update({
        where: { user_id: receiver_id },
        data: { balance: { increment: amount } },
      });

      // Create the fund transfer record
      const fundTransfer = await prisma.fund_Transfer.create({
        data: {
          sender_id,
          receiver_id,
          amount,
          transfer_date: new Date(),
          description,
        },
      });

      return fundTransfer;
    });

    return result;
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw new Error('Failed to transfer funds');
  }
};

export const getAllFundTransfers = async () => {
  try {
    const fundTransfers = await prisma.fund_Transfer.findMany({
      include: {
        Sender: true,
        Receiver: true,
      },
    });
    return fundTransfers;
  } catch (error) {
    console.error('Error retrieving fund transfers:', error);
    throw new Error('Failed to retrieve fund transfers');
  }
};
