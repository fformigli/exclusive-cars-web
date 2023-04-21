import prisma from "../src/lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '$2a$10$Z0.J2AZa44av6sVM20qXu.JNscwf6IYBqwH/nMRL84b1jBtZlzHDu',
      fullName: 'Administrador',
      role: {
        create: {
          name: 'Administrador'
        }
      }
    }
  })
}

main()
  .catch(e => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })