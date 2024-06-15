import prisma from '../../app/utils/client'

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'password',
      email: 'johndoe@mail.com',
      phone: '081234567890',
      profile_image: 'https://example.com/image.jpg',
      address: 'Jl. Lorem Ipsum Dolor Sit Amet',
      balance: 100000,
      statusId: 1,
      roleId: 1
    }
  })
}

main()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
