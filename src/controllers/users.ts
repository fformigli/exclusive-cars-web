import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import {
  validateReferenceNameAlreadyExists,
  validateRoleReferenceId,
  validateUserReferenceId
} from "../lib/prismaUtils";
import { encryptPassword, getQueryString } from "../lib/helpers";
import { getDocumentTypes, getRoles } from "./configurations";

export const users = async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany({
    where: {
      type: 1
    },
    include: {
      role: true
    }
  })

  res.render('users/list.hbs', { users })
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)

    const user = await validateUserReferenceId(id)
    await checkNoModificationAllowedUsers(req.user, user)

    await prisma.user.delete({
      where: {
        id: user.id
      }
    })

    req.flash('success', 'Se elimino el usuario');
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
  } finally {
    res.redirect('/users');
  }
};

export const userForm = async (req: Request, res: Response) => {
  const dataForm = {
    roles: await getRoles('user'),
    documentTypes: await getDocumentTypes(),
    ...req.query,
    cancelPath: '/users'
  }

  res.render('users/createForm', dataForm);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    let { username, password, fullName, roleId, documentType, documentNumber } = req.body
    await validateReferenceNameAlreadyExists(prisma.user, { username }, 'un usuario', 'este nickname')
    const role = await validateRoleReferenceId(+roleId)

    password = await encryptPassword(password);

    await prisma.user.create({
      data: {
        fullName,
        password,
        role: {
          connect: { id: role.id }
        },
        documentType: {
          connect: { id: +documentType }
        },
        documentNumber: documentNumber,
        type: 1, // tipo usuario
        username
      }
    })

    req.flash('success', 'Se agregó el usuario exitosamente!')
    return res.redirect('/users')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/users/add?${query}`);
  }
}

export const editUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)

    const user: User = await validateUserReferenceId(id)

    const dataForm: any = {
      fullName: user.fullName,
      id: user.id,
      role: {
        id: user.roleId
      },
      roles: await getRoles('user'),
      documentTypes: await getDocumentTypes(),
      documentNumber: user.documentNumber,
      username: user.username,
      cancelPath: '/users',
    }

    req.flash('success', 'Usuario modificado')
    res.render('users/editForm', dataForm);
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/users/add?${query}`);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)
    const { username, fullName, roleId, documentType, documentNumber } = req.body

    const user = await validateUserReferenceId(id)
    const role = await validateRoleReferenceId(+roleId)
    await validateReferenceNameAlreadyExists(prisma.user, { username }, 'un usuario', 'este nickname', id)
    await checkNoModificationAllowedUsers(req.user, user)

    await prisma.user.update({
      where: {
        id
      },
      data: {
        fullName,
        role: {
          connect: { id: role.id }
        },
        documentType: {
          connect: { id: +documentType }
        },
        documentNumber,
        username,
      }
    })


    req.flash('success', 'Usuario actualizado');
    res.redirect('/users');
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/users/add?${query}`);
  }
}

const checkNoModificationAllowedUsers = (loggedUser: User, user: User) => {
  if (user.id === loggedUser.id) {
    throw "No se puede modificar el usuario con el que has iniciado sesión"
  }

  if (user.id === 1) {
    throw "No se puede modificar el usuario Administrador"
  }
}