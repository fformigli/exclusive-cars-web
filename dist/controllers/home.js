"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const home = (req, res) => {
    console.log('render home');
    return res.render('home/home.hbs');
};
exports.home = home;
