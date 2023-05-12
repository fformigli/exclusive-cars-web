import prisma from "../src/lib/prisma";

async function main() {
  // se agregan configuraciones basicas
  await prisma.configuration.createMany({
    data: [
      { id: 1, type: 'DOCUMENT_TYPES', shortName: 'C.I.', name: 'Cédula de identidad paraguaya'}
    ]
  })

  // agregamos los roles
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Administrador', context: 'user'},
      { id: 2, name: 'Cliente', context: 'client'},
    ]
  })


  // agregamos el usuario administrador
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '$2a$10$Z0.J2AZa44av6sVM20qXu.JNscwf6IYBqwH/nMRL84b1jBtZlzHDu',
      fullName: 'Administrador',
      documentType: {
        connect: {
          id: 1 // CI
        }
      },
      documentNumber: "0",
      role: {
        connect: {
          id: 1
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