import { Client } from "@prisma/client";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { getDocumentTypes, getRoles } from "./configurations";
import { validateReferenceNameAlreadyExists } from "../lib/prismaUtils";
import { encryptPassword, getQueryString, notImplementedYetRedirect } from "../lib/helpers";

export const listClients = async (req: Request, res: Response) => {
  const clients: Client[] = await prisma.client.findMany({
    include: {
      user: true
    }
  })

  res.render('clients/list.hbs', { clients })
}

export const addClientForm = async (req: Request, res: Response) => {
  const dataForm = {
    roles: await getRoles('client'),
    documentTypes: await getDocumentTypes(),
    ...req.query,
    cancelPath: '/clients'
  }

  res.render('clients/createForm', dataForm);
}

export const createClient = async (req: Request, res: Response) => {
  try {
    let { username, password, fullName, documentType, documentNumber, phoneNumber, email, ruc, } = req.body
    await validateReferenceNameAlreadyExists(prisma.user, { username }, 'un usuario', 'este nickname')

    password = await encryptPassword(password);

    await prisma.client.create({
      data: {
        user: {
          create: {
            password,
            role: {
              connect: { id: 2 } // rol 2 para clientes
            },
            documentType: {
              connect: { id: +documentType }
            },
            documentNumber: documentNumber,
            type: 2, // tipo cliente
            fullName,
            username,
          }
        },
        phoneNumber,
        email,
        ruc
      }
    })

    req.flash('success', 'Se agregó el cliente exitosamente!')
    return res.redirect('/clients')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/clients/add?${query}`);
  }
}

export const editClientForm = async (req: Request, res: Response) => notImplementedYetRedirect(req, res, '/clients')

export const updateClient = async (req: Request, res: Response) => notImplementedYetRedirect(req, res, '/clients')

export const deleteClient = async (req: Request, res: Response) => notImplementedYetRedirect(req, res, '/clients')