import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import { encryptPassword, getQueryString } from "../lib/helpers";
import { validateReferenceId, validateReferenceNameAlreadyExists } from "../lib/prismaUtils";

const pool = require('../database');

export const admin = (req: Request, res: Response) => {
  res.render('admin/admin.hbs');
};

export const users = async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany({
    where: {
      type: 1
    },
    include: {
      role: true
    }
  })

  res.render('admin/users.hbs', { users })
};

export const usersDelete = (req: Request, res: Response) => {
  const { id } = req.params;
  pool.query('delete from users where id = $1', [id], (err: any) => {
    if (err) {
      // todo return done(null, false, req.flash('message', 'No se pudo conectar con la base de datos.'));
      console.error('No se pudo conectar con la base de datos.')

    }
    req.flash('success', 'Se elimino el usuario');
    res.redirect('/admin/users');
  });
};

export const signUpGet = async (req: Request, res: Response) => {
  console.log({ query: req.query })
  const dataForm = {
    roles: await prisma.role.findMany(),
    ...req.query
  }
  res.render('admin/userForm', dataForm);
};

export const signUpPost = async (req: Request, res: Response) => {
  try {

    let { username, password, fullName, roleId } = req.body
    await validateReferenceNameAlreadyExists(prisma.user, { username }, 'un usuario', 'este nickname')
    const role = await validateReferenceId(prisma.role, +roleId, 'rol')

    password = await encryptPassword(password);

    await prisma.user.create({
      data: {
        fullName,
        password,
        role: {
          connect: { id: role.id }
        },
        type: 1, // tipo usuario
        username
      }
    })

    req.flash('success', 'Se agregó el usuario exitosamente!')
    return res.redirect('/admin/users')
  } catch (e: any) {
    console.log(e)
    req.flash('message', e.message || e)
    const query = getQueryString(req.body)
    return res.redirect(`/admin/users/add?${query}`);
  }
}