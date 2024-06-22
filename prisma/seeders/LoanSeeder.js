import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Loan_Application data
  const loanApplication1 = await prisma.loan_Application.create({
    data: {
      user_id: 1,
      amount: 10000,
      application_date: new Date(),
      statusloan_id: 1, // Assuming status ID 1 exists
    },
  });

  const loanApplication2 = await prisma.loan_Application.create({
    data: {
      user_id: 1,
      amount: 20000,
      application_date: new Date(),
      statusloan_id: 2, // Assuming status ID 2 exists
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
