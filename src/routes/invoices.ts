import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { PERMISSIONS } from "../lib/constants/permissions";
import { getPurchaseForm, purchaseInvoices } from "../controllers/invoices";

const routes = Router();

const {
  ADMIN_FINANCIAL_MANAGEMENT,
} = PERMISSIONS

// gestion de facturas
routes.get('/purchase-invoices', isLoggedIn, checkAccess(ADMIN_FINANCIAL_MANAGEMENT), purchaseInvoices);
routes.get('/purchase-invoices/add', isLoggedIn, checkAccess(ADMIN_FINANCIAL_MANAGEMENT), getPurchaseForm);

export default routes