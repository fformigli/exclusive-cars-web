import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { PERMISSIONS } from "../lib/constants/permissions";
import { createSupplier, getSupplierForm, suppliers } from "../controllers/suppliers";

const routes = Router();

const {
  ADMIN_SUPPLIERS,
  LIST_SUPPLIERS,
  CREATE_SUPPLIERS,
  MODIFY_SUPPLIERS,
} = PERMISSIONS

// gestion de proveedores
routes.get('/suppliers', isLoggedIn, checkAccess([ADMIN_SUPPLIERS, LIST_SUPPLIERS]), suppliers);
routes.get('/suppliers/add', isLoggedIn, checkAccess([ADMIN_SUPPLIERS, CREATE_SUPPLIERS]), getSupplierForm);
routes.post('/suppliers', isLoggedIn, checkAccess([ADMIN_SUPPLIERS, CREATE_SUPPLIERS]), createSupplier);
routes.get('/suppliers/:id', isLoggedIn, checkAccess([ADMIN_SUPPLIERS, MODIFY_SUPPLIERS]), getSupplierForm);

export default routes