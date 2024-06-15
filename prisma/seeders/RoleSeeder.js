import prisma from '../../app/utils/client.js'

async function main() {
  const roles = [
    {
      role_name: 'admin',
      permissions: '*'
    },
    {
      role_name: 'seller',
      permissions: 'create:product,update:product,delete:product'
    },
    {
      role_name: 'user',
      permissions: 'read:product,read:profile,update:profile,update:password'
    }
  ]

  for (const role of roles) {
    await prisma.role.create({
      data: role
    })
  }
}

main()
  .catch((e) => {
    throw e.message
  })
  .finally(async () => {
    console.log('Roles seeded successfully')
    await prisma.$disconnect()
  })
