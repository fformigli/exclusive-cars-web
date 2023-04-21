"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const home_1 = require("../controllers/home");
const auth_1 = require("../lib/auth");
const express_1 = require("express");
exports.routes = (0, express_1.Router)();
exports.routes.get('/', auth_1.isLoggedIn, home_1.home);
