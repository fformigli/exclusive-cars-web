import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { financialManagementOptions, systemAdministrationOptions } from "../controllers/systemAdministrationOptions";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

routes.get('/admin', isLoggedIn, checkAccess(PERMISSIONS.ADMIN_OPTIONS), systemAdministrationOptions);
routes.get('/financial-management', isLoggedIn, checkAccess([PERMISSIONS.ADMIN_FINANCIAL_MANAGEMENT, PERMISSIONS.FINANCIAL_MANAGEMENT_OPTIONS]), financialManagementOptions);

export default routes