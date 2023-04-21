import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";

const pool = require('../database');

export const admin = (req: Request, res: Response) => {
  res.render('admin/admin.hbs');
};

export const users = async (req: Request, res: Response) => {
  const users: User[] = await prisma.user.findMany({
    include:{
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