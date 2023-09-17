import prisma from "./prisma";
import { User } from "@prisma/client"
import { matchPassword } from "./helpers"
import { Request } from "express";
import { Prisma } from "@prisma/client";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signIn', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req: Request, username: string, password: string, done: any) => {
  console.log('local.signIn')
  let user: User
  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        username
      }
    })

    if (!await matchPassword(password, user.password)) {
      return done(null, false, req.flash('message', 'Contraseña Inválida'));
    }

    done(null, user, req.flash('success', 'Bienvenido, ' + user.fullName));
  } catch (e) {
    console.log('hubo un error')
    if(e instanceof Prisma.NotFoundError) {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
    console.log(e)
  }
}));

passport.serializeUser((user: User, done: any) => done(null, user.id))

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user: User = await prisma.user.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        Role: {
          include: {
            Permissions: true
          }
        }
      }
    })

    done(null, user)
  } catch (e) {
    done(e)
  }
});