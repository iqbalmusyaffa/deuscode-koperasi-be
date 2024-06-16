import prisma from '../../app/utils/client.js'

async function main() {
  const statuses = [
    {
      status_name: 'Active'
    },
    {
      status_name: 'Inactive'
    },
    {
      status_name: 'Blocked'
    }
  ]

  for (const status of statuses) {
    await prisma.user_Status.create({
      data: status
    })
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    console.log('Statuses seeded successfully')
    await prisma.$disconnect()
  })
