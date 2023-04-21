"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const { Router } = require('express');
const home_1 = require("./home");
const authentication_1 = require("./authentication");
const admin_1 = require("./admin");
const workOrder_1 = require("./workOrder");
exports.routes = Router();
exports.routes.use(home_1.routes);
exports.routes.use(authentication_1.routes);
exports.routes.use(admin_1.routes);
exports.routes.use(workOrder_1.routes);
