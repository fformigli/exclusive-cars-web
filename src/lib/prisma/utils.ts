import prisma from "./index";

export const validateReferenceId = async (model: any, id: number, modelName: string = 'registro', include?: any) => {
  if(!id){
    throw `El identificador de ${modelName} es requerido`
  }
  const query: any = {
    where: {
      id,
      deletedAt: null
    },
  }

  if(include) {
    query.include = include
  }
  const data = await model.findFirst(query)

  if (!data) {
    throw `No se encuentra ningún ${modelName} con el identificador enviado.`
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
  where.deletedAt = null

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

export const blockSeedModifications = (item: any) => {
  if (item.seed) {
    throw "No se puede modificar este registro. Es parte del sistema base."
  }
}

export const validateUserReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.user, id, 'usuario', include)
}

export const validateClientReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.client, id, 'clientes', include)
}

export const validateRoleReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.role, id, 'rol', include)
}

export const validateConfigurationTypeReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.configurationType, id, 'tipo de configuración', include)
}

export const validateConfigurationReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.configuration, id, 'configuración', include)
}

export const validateWorkOrderReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.workOrder, id, 'orden de trabajo', include)
}

export const validateWorkShopBranchReferenceId = async (id: number, include?: any) => {
  return validateReferenceId(prisma.workShopBranch, id, 'sucursal', include)
}