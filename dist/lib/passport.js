"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./prisma"));
const helpers_1 = require("./helpers");
const client_1 = require("@prisma/client");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use('local.signIn', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    try {
        user = yield prisma_1.default.user.findFirstOrThrow({
            where: {
                username
            }
        });
        if (!(yield (0, helpers_1.matchPassword)(password, user.password))) {
            return done(null, false, req.flash('message', 'Contraseña Inválida'));
        }
        done(null, user, req.flash('success', 'Bienvenido, ' + user.fullName));
    }
    catch (e) {
        if (e instanceof client_1.Prisma.NotFoundError) {
            return done(null, false, req.flash('message', 'El usuario no existe'));
        }
    }
})));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    done(user);
}));
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
