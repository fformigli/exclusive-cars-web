"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersDelete = exports.users = exports.admin = void 0;
const pool = require('../database');
const admin = (req, res) => {
    res.render('admin/admin.hbs');
};
exports.admin = admin;
const users = (req, res) => {
    pool.query('select * from users order by id asc', (err, users) => {
        if (err) {
            // todo return done(null, false, req.flash('message', 'No se pudo conectar con la base de datos.'));
            console.error('No se pudo conectar con la base de datos.');
        }
        res.render('admin/users.hbs', { users: users.rows });
    });
};
exports.users = users;
const usersDelete = (req, res) => {
    const { id } = req.params;
    pool.query('delete from users where id = $1', [id], (err) => {
        if (err) {
            // todo return done(null, false, req.flash('message', 'No se pudo conectar con la base de datos.'));
            console.error('No se pudo conectar con la base de datos.');
        }
        req.flash('success', 'Se elimino el usuario');
        res.redirect('/admin/users');
    });
};
exports.usersDelete = usersDelete;
