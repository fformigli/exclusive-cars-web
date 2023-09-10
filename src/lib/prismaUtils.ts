import prisma from "./prisma";

export const validateReferenceId = async (model: any, id: number, modelName: string = 'registro') => {
  console.log(id)
  const data = await model.findUnique({
    where: {
      id
    }
  })

  if (!data) {
    throw `No se encuentra ningun ${modelName} con el identificador enviado.`
  }

  return data
}

export const validateReferenceNameAlreadyExists = async (
  model: any,
  where: any,
  modelName: string = 'un registro',
  fieldName: string = 'este valor',
  id?: number
) => {
  console.log({ model, where, modelName, fieldName })
  if (id) {
    where.id = {
      not: id
    }
  }
  const data = await model.findFirst({
    where
  })

  if (data) {
    throw `Ya existe ${modelName} con ${fieldName}.`
  }

  return
}

export const validateUserReferenceId = async (id: number) => {
  return validateReferenceId(prisma.user, id, 'usuario')
}

export const validateRoleReferenceId = async (id: number) => {
  return validateReferenceId(prisma.role, id, 'rol')
}

export const validateConfigurationTypeReferenceId = async (id: number) => {
  return validateReferenceId(prisma.configurationType, id, 'tipo de configuración')
}

export const validateConfigurationReferenceId = async (id: number) => {
  return validateReferenceId(prisma.configuration, id, 'configuración')
}