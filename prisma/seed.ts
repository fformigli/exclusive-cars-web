import prisma from "../src/lib/prisma";

const createMany = async (model: any, list: any[]) => {
  for (const data of list) {
    await model.create({ data })
  }
}

async function main() {
  // add branches
  const branchesToCreate: any[] = [
    { name: '25 de mayo', address: '25 de mayo 123', phoneNumber: '0983 265 381' },
    { name: 'Encarnacion', address: 'Encarnacion 123', phoneNumber: '0983 265 381' }
  ]

  await createMany(prisma.workShopBranch, branchesToCreate)

  // add configuration types
  const configurationTypesToCreate: any[] = [
    { name: 'DOCUMENT_TYPES', description: 'Tipos de documentos personales', translate: 'Tipos de documento' },
    { name: 'FUEL_STATE', description: 'Nivel de combustible', translate: 'Nivel de combustible' }
  ]

  await createMany(prisma.configurationType, configurationTypesToCreate)

  // add basic configurations
  const configurationsToCreate: any[] = [
    { configurationTypeId: 1, shortName: 'C.I.', name: 'Cédula de identidad paraguaya', seed: true },
    { configurationTypeId: 2, shortName: 'E', name: 'Vacío', seed: true },
    { configurationTypeId: 2, shortName: '1/4', name: '1/4', seed: true },
    { configurationTypeId: 2, shortName: '1/2', name: '1/2', seed: true },
    { configurationTypeId: 2, shortName: '3/4', name: '3/4', seed: true },
    { configurationTypeId: 2, shortName: 'F', name: 'Lleno', seed: true }
  ]

  await createMany(prisma.configuration, configurationsToCreate)

  const permissionsToCreate: any[] = [
    { name: 'ADMIN_OPTIONS', description: 'Acceso a la consola de administración', category: 'Administración' },
    { name: 'ADMIN_USERS', description: 'Administrar Usuarios', category: 'Administración' },
    { name: 'LIST_USERS', description: 'Listar Usuarios', category: 'Usuarios' },
    { name: 'CREATE_USERS', description: 'Crear Usuarios', category: 'Usuarios' },
    { name: 'MODIFY_USERS', description: 'Modificar Usuarios', category: 'Usuarios' },
    { name: 'DELETE_USERS', description: 'Eliminar Usuarios', category: 'Usuarios' },
    { name: 'ADMIN_CLIENTS', description: 'Administrar Clientes', category: 'Administración' },
    { name: 'CREATE_CLIENTS', description: 'Crear Clientes', category: 'Clientes' },
    { name: 'LIST_CLIENTS', description: 'Listar Clientes', category: 'Clientes' },
    { name: 'MODIFY_CLIENTS', description: 'Modificar Clientes', category: 'Clientes' },
    { name: 'DELETE_CLIENTS', description: 'Eliminar Clientes', category: 'Clientes' },
    { name: 'ADMIN_CONFIGURATIONS', description: 'Administrar Configuraciones', category: 'Administración' },
    { name: 'LIST_CONFIGURATIONS', description: 'Listar Configuraciones', category: 'Configuraciones' },
    { name: 'CREATE_CONFIGURATIONS', description: 'Crear Configuraciones', category: 'Configuraciones' },
    { name: 'MODIFY_CONFIGURATIONS', description: 'Modificar Configuraciones', category: 'Configuraciones' },
    { name: 'DELETE_CONFIGURATIONS', description: 'Eliminar Configuraciones', category: 'Configuraciones' },
    { name: 'ADMIN_WORK_ORDERS', description: 'Administrar Ordenes de Trabajo', category: 'Administración' },
    { name: 'LIST_WORK_ORDERS', description: 'Listar Ordenes de Trabajo', category: 'Ordenes de Trabajo' },
    { name: 'CREATE_WORK_ORDERS', description: 'Crear Ordenes de Trabajo', category: 'Ordenes de Trabajo' },
    { name: 'MODIFY_WORK_ORDERS', description: 'Modificar Ordenes de Trabajo', category: 'Ordenes de Trabajo' },
    { name: 'DELETE_WORK_ORDERS', description: 'Eliminar Ordenes de Trabajo', category: 'Ordenes de Trabajo' },
    { name: 'ADMIN_ROLES', description: 'Administrar Roles', category: 'Administración' },
    { name: 'LIST_ROLES', description: 'Listar Roles', category: 'Roles' },
    { name: 'CREATE_ROLES', description: 'Crear Roles', category: 'Roles' },
    { name: 'MODIFY_ROLES', description: 'Modificar Roles', category: 'Roles' },
    { name: 'DELETE_ROLES', description: 'Eliminar Roles', category: 'Roles' },
  ]

  await createMany(prisma.permission, permissionsToCreate)

  // add roles
  const rolesToCreate: any[] = [
    { name: 'Administrador', context: 'user', Permissions: [1, 2, 7, 12, 17, 22], seed: true },
    { name: 'Cliente', context: 'client', Permissions: [18], seed: true },
    { name: 'Mecánico', context: 'user', Permissions: [18, 19, 20, 21], seed: true },
  ]

  rolesToCreate.forEach(role => {
    role.Permissions = {
      connect: role.Permissions.map((p: number) => ({ id: p }))
    }
  })

  await createMany(prisma.role, rolesToCreate)

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
      },
      WorkShopBranch: {
        connect: { id: 1}
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