import { Request, Response } from "express"
import prisma from "../lib/prisma";
import { Permission, Role, User } from "@prisma/client";
import { ROLE_CONTEXT_TRANSLATE } from "../lib/constants/translate";
import {
  blockSeedModifications,
  validateReferenceNameAlreadyExists,
  validateRoleReferenceId
} from "../lib/prisma/utils";
import { getQueryString } from "../lib/helpers";

// utils
const getRoleContexts = () => Object.entries(ROLE_CONTEXT_TRANSLATE).reduce((r: any, s: [string, string]) => {
  r.push({
    value: s[0],
    label: s[1]
  })
  return r
}, [])

const getPermissionsCategorized = async () => {
  const permissions: Permission[] = await prisma.permission.findMany()

  return permissions.reduce((categories: any[], permission: Permission) => {
    const category = categories.find((c) => c.category === permission.category)
    if (category) {
      category.permissions.push(permission)
    } else {
      categories.push({ category: permission.category, permissions: [permission] })
    }

    return categories
  }, [])
}

const validateRoleNotInUse = async (id: number) => {
  const user: any = await prisma.user.findFirst({
    where: {
      roleId: id,
      deletedAt: null
    }
  })

  if(user) {
    throw 'Hay usuarios usando este rol'
  }
}

// endpoints
export const roles = async (req: Request, res: Response) => {
  try {

    const roles: Role[] = await prisma.role.findMany({
      where: {
        deletedAt: null
      },
      include: { Permissions: true, Users: true }
    })

    const dataForm: any = {
      roleContexts: getRoleContexts(),
      roles
    }

    // traducimos
    dataForm.roles?.forEach((role: any) => {
      role.contextLabel = ROLE_CONTEXT_TRANSLATE[role.context] ?? role.context
    })

    res.render('roles/list.hbs', { roles, dataForm })
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    return res.redirect(`/`);
  }
}

export const getRoleForm = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params?.id, 10)
    const dataForm: any = {
      roleContexts: getRoleContexts(),
      permissionsCategorized: await getPermissionsCategorized(),
      cancelPath: '/roles',
      role: req.query
    }

    if (id) { // estamos editando
      dataForm.role = await validateRoleReferenceId(id, { include: { Permissions: true } })
      dataForm.role.permissions = dataForm.role.Permissions.reduce((permissions: number[], permission: Permission) => {
        permissions.push(permission.id)
        return permissions
      }, [])
    }

    return res.render('roles/form', dataForm)
  } catch (e: any) {
    console.log(e)
    req.flash('message', 'Error: ' + e.message);
    return res.redirect('/roles');
  }
}

export const createRole = async (req: Request, res: Response) => {
  try {
    let { name, context, permissions } = req.body
    console.log(permissions)
    await validateReferenceNameAlreadyExists(prisma.role, { name }, 'un role', 'este nombre')

    if(!permissions) {
      throw 'Debe seleccionar al menos un permiso'
    } else if(!Array.isArray(permissions)) {
      permissions = [permissions]
    }

    await prisma.role.create({
      data: {
        name,
        context,
        Permissions: {
          connect: permissions.map((p: string) => ({ id: +p }))
        }
      }
    })

    req.flash('success', 'Se agregó el rol exitosamente!')
    return res.redirect('/roles')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    console.log(query)
    return res.redirect(`/roles/add?${query}`);
  }
}

export const updateRole = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)
  try {
    let { name, context, permissions } = req.body
    await validateRoleReferenceId(id)
    await validateReferenceNameAlreadyExists(prisma.role, { name }, 'un role', 'este nombre', id)

    console.log(permissions)

    if(!permissions) {
      throw 'Debe seleccionar al menos un permiso'
    } else if(!Array.isArray(permissions)) {
      permissions = [permissions]
    }

    await prisma.role.update({
      where: {
        id
      },
      data: {
        name,
        context,
        Permissions: {
          set: [],
          connect: permissions.map((p: string) => ({ id: +p }))
        }
      }
    })

    req.flash('success', 'Se actualizo el rol exitosamente!')
    return res.redirect('/roles')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/roles/${id}?${query}`);
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params?.id, 10)
  try {
    const role = await validateRoleReferenceId(id)
    blockSeedModifications(role)
    await validateRoleNotInUse(id)

    await prisma.role.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })

    req.flash('success', 'Se eliminó el rol exitosamente!')
    return res.redirect('/roles')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/roles`);

  }
}