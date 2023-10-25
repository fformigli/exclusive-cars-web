import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { createRole, deleteRole, getRoleForm, roles, updateRole } from "../controllers/roles";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

const {
  ADMIN_ROLES,
  LIST_ROLES,
  CREATE_ROLES,
  MODIFY_ROLES,
  DELETE_ROLES
} = PERMISSIONS

// gestion de usuarios
routes.get('/roles', isLoggedIn, checkAccess([ADMIN_ROLES, LIST_ROLES]), roles);
routes.get('/roles/add', isLoggedIn, checkAccess([ADMIN_ROLES, CREATE_ROLES]), getRoleForm);
routes.post('/roles', isLoggedIn, checkAccess([ADMIN_ROLES, CREATE_ROLES]), createRole);
routes.get('/roles/:id', isLoggedIn, checkAccess([ADMIN_ROLES, MODIFY_ROLES]), getRoleForm);
routes.post('/roles/:id', isLoggedIn, checkAccess([ADMIN_ROLES, MODIFY_ROLES]), updateRole);
routes.get('/roles/delete/:id', isLoggedIn, checkAccess([ADMIN_ROLES, DELETE_ROLES]), deleteRole);

export default routes