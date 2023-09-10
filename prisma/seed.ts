import prisma from "../src/lib/prisma";

async function main() {
  // add configuration types
  await prisma.configurationType.createMany({
    data: [
      { id: 1, name: 'DOCUMENT_TYPES', description: 'Tipos de documentos personales', translate: 'Tipos de documento' },
      { id: 2, name: 'FUEL_STATE', description: 'Nivel de combustible', translate: 'Nivel de combustible' }
    ]
  })

  // add basic configurations
  await prisma.configuration.createMany({
    data: [
      { id: 1, configurationTypeId: 1, shortName: 'C.I.', name: 'Cédula de identidad paraguaya', seed: true },
      { id: 2, configurationTypeId: 2, shortName: 'E', name: 'Vacío', seed: true },
      { id: 3, configurationTypeId: 2, shortName: '1/4', name: '1/4', seed: true },
      { id: 4, configurationTypeId: 2, shortName: '1/2', name: '1/2', seed: true },
      { id: 5, configurationTypeId: 2, shortName: '3/4', name: '3/4', seed: true },
      { id: 6, configurationTypeId: 2, shortName: 'F', name: 'Lleno', seed: true }
    ]
  })

  // add roles
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'Administrador', context: 'user' },
      { id: 2, name: 'Cliente', context: 'client' },
      { id: 3, name: 'Mecánico', context: 'user' },
    ]
  })


  // add admin user
  await prisma.user.create({
    data: {
      username: 'admin',
      password: '$2a$10$Z0.J2AZa44av6sVM20qXu.JNscwf6IYBqwH/nMRL84b1jBtZlzHDu',
      fullName: 'Administrador',
      DocumentType: {
        connect: {
          id: 1 // CI
        }
      },
      documentNumber: "0",
      Role: {
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