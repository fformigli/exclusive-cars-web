import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { IConfigurationList } from "../lib/types";
import { Configuration, ConfigurationType } from "@prisma/client";
import {
  validateConfigurationReferenceId,
  validateConfigurationTypeReferenceId,
  validateReferenceNameAlreadyExists
} from "../lib/prisma/utils";
import { getQueryString } from "../lib/helpers";
import { CONFIGURATION_TYPES } from "../lib/constants/general";

const getCombosData = async () => {
  const dataForm: any = {
    configurationTypes: await prisma.configurationType.findMany()
  }

  return dataForm

}
export const configurations = async (req: Request, res: Response) => {
  const configurations: IConfigurationList[] = await prisma.configuration.findMany({
    include: {
      ConfigurationType: true
    },
    orderBy: [
      {
        configurationTypeId: 'asc',
      },
      {
        id: 'asc'
      }

    ]
  })

  console.log({ configurations })

  res.render('configurations/list.hbs', { configurations })
}

export const createConfigurationForm = async (req: Request, res: Response) => {
  const dataForm = await getCombosData()


  res.render('configurations/createForm', dataForm)
}

export const createConfiguration = async (req: Request, res: Response) => {
  try {
    let { configurationTypeId, shortName, name } = req.body
    await validateReferenceNameAlreadyExists(prisma.configuration, { shortName }, 'una configuration', 'este nombre corto')
    await validateReferenceNameAlreadyExists(prisma.configuration, { name }, 'una configuration', 'este nombre')
    const configurationType: ConfigurationType = await validateConfigurationTypeReferenceId(+configurationTypeId)

    console.log('procedemos a crear')
    await prisma.configuration.create({
      data: {
        shortName,
        name,
        ConfigurationType: {
          connect: {
            id: configurationType.id
          }
        }
      }
    })

    req.flash('success', 'Se agregó la configuración exitosamente!')
    return res.redirect('/configurations')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    console.log(query)
    return res.redirect(`/configurations/add?${query}`);
  }
}

export const editConfigurationForm = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)
    const configuration: Configuration = await validateConfigurationReferenceId(id)

    const dataForm: any = {
      ...await getCombosData(),
      ...configuration,
      cancelPath: '/configurations',
    }
    console.log(dataForm)

    req.flash('success', 'Configuración modificada')
    res.render('configurations/createForm', dataForm);
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`/configurations`);
  }
}

export const deleteConfiguration = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)

    const configuration = await validateConfigurationReferenceId(id)
    checkNoModificationAllowedConfigurations(configuration)

    await prisma.configuration.delete({
      where: {
        id: configuration.id
      }
    })

    req.flash('success', 'Se elimino la configuración');
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
  } finally {
    res.redirect('/configurations');
  }
}

export const updateConfiguration = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)
    let { configurationTypeId, shortName, name } = req.body
    await validateReferenceNameAlreadyExists(prisma.configuration, { shortName }, 'una configuration', 'este nombre corto', id)
    await validateReferenceNameAlreadyExists(prisma.configuration, { name }, 'una configuration', 'este nombre', id)
    const configurationType: ConfigurationType = await validateConfigurationTypeReferenceId(+configurationTypeId)

    await prisma.configuration.update({
      where: {
        id
      },
      data: {
        shortName,
        name,
        ConfigurationType: {
          connect: { id: configurationType.id }
        }
      }
    })

    req.flash('success', 'Se actualizó la configuración exitosamente!')
    return res.redirect('/configurations')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/conifgurations/edit/${req.params.id}?${query}`);
  }
}

export const getDocumentTypes = async () => {
  // obtenemos los tipos de documentos
  return prisma.configuration.findMany({
    where: {
      configurationTypeId: CONFIGURATION_TYPES.DOCUMENT_TYPES
    }
  });
}

export const getRoles = async (context: string) => {
  return prisma.role.findMany({
    where: {
      context
    }
  })
}

export const getFuelLevels = async () => {
  return prisma.configuration.findMany({
    where: {
      configurationTypeId: CONFIGURATION_TYPES.FUEL_LEVELS
    }
  })
}

const checkNoModificationAllowedConfigurations = (configuration: Configuration) => {
  if (configuration.seed) {
    throw "No se puede modificar esta configuración. Es parte del sistema base."
  }
}