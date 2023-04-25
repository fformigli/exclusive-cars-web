export const validateReferenceId = async (model: any, id: number, modelName: string = 'registro') => {
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
  fieldName: string = 'este valor'
) => {
  console.log({ model, where, modelName, fieldName})
  const data = await model.findFirst({
    where
  })

  if (data) {
    throw `Ya existe ${modelName} con ${fieldName}.`
  }

  return
}