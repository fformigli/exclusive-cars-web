import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { admin } from "../controllers/admin";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

routes.get('/admin', isLoggedIn, checkAccess(PERMISSIONS.ADMIN_OPTIONS), admin);

export default routes