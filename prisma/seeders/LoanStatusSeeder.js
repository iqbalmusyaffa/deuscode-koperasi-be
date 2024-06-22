import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed Loan_Status data
  const loanStatuses = [
    {
      name_status: 'Pending',
    },
    {
      name_status: 'Approved',
    },
    {
      name_status: 'Rejected',
    },
  ];

  for (const status of loanStatuses) {
    await prisma.loan_Status.create({
      data: {
        name_status: status.name_status,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  console.log('Loan statuses seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
