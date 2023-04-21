"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isNotLoggedIn = exports.isLoggedIn = void 0;
const isLoggedIn = (req, res, next) => {
    console.log('is logged in?');
    if (req.isAuthenticated())
        return next();
    return res.redirect('/signin');
};
exports.isLoggedIn = isLoggedIn;
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated())
        return next();
    return res.redirect('/profile');
};
exports.isNotLoggedIn = isNotLoggedIn;
const isAdmin = (req, res, next) => {
    if (req.user.isadmin)
        return next();
    return res.redirect('/forbidden');
};
exports.isAdmin = isAdmin;
