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

    console.log(user)
    console.log('match?')
    if (!await matchPassword(password, user.password)) {
      return done(null, false, req.flash('message', 'Contraseña Inválida'));
    }

    console.log('matcheo!')

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
      }
    })

    done(null, user)
  } catch (e) {
    done(e)
  }
});


// passport.use('local.signup', new LocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true
//
// }, async (req, username, password, done) => {
//   const { fullname, isAdmin } = req.body
//   password = await helpers.encryptPassword(password);
//
//   pool.query('select * from users where username = $1', [username], (err, users) => {
//     if (err) return done(null, false, req.flash('message', 'No se pudo conectar con la base de datos.'));
//     if (users.rows.length > 0) return done(null, false, req.flash('message', 'El username ya existe'));
//
//     pool.query('insert into users(fullname, username, password, isadmin) '
//       + 'values ($1, $2, $3, $4) returning id', [fullname, username, password, isAdmin == null ? 0 : isAdmin], (err, data) => {
//       if (err) return done(err);
//       return done(null, req.user);
//     });
//
//   });
// }));