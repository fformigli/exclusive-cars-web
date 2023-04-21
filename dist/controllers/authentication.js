"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogin = exports.logout = exports.forbidden = exports.profile = exports.signInPost = exports.signInGet = exports.signUpPost = exports.signUpGet = void 0;
const passport = require('passport');
const signUpGet = (req, res) => {
    res.render('auth/signUp');
};
exports.signUpGet = signUpGet;
exports.signUpPost = passport.authenticate('local.signUp', {
    successRedirect: '/admin/users',
    failureRedirect: '/signUp',
    failureFlash: true
});
const signInGet = (req, res) => {
    res.render('auth/signIn');
};
exports.signInGet = signInGet;
const signInPost = (req, res, next) => {
    passport.authenticate('local.signIn', {
        successRedirect: '/',
        failureRedirect: '/signIn',
        failureFlash: true
    })(req, res, next);
};
exports.signInPost = signInPost;
const profile = (req, res) => {
    res.render('auth/profile');
};
exports.profile = profile;
const forbidden = (req, res) => {
    req.flash('message', 'No posee permisos para ver esta página');
    res.redirect('/profile');
};
exports.forbidden = forbidden;
const logout = (req, res) => {
    req.logOut();
    res.redirect('/signIn');
};
exports.logout = logout;
const apiLogin = (req, res) => {
    const user = { userId: 1, displayName: "test ok" };
    res.json(user);
};
exports.apiLogin = apiLogin;
