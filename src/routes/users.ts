import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { editUserForm, updateUser, users, deleteUser, userForm, createUser } from "../controllers/users";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

const {
  ADMIN_USERS,
  LIST_USERS,
  CREATE_USERS,
  MODIFY_USERS,
  DELETE_USERS
} = PERMISSIONS

// gestion de usuarios
routes.get('/users', isLoggedIn, checkAccess([ADMIN_USERS, LIST_USERS]), users);
routes.get('/users/add', isLoggedIn, checkAccess([ADMIN_USERS, CREATE_USERS]), userForm);
routes.post('/users', isLoggedIn, checkAccess([ADMIN_USERS, CREATE_USERS]), createUser);
routes.get('/users/:id', isLoggedIn, checkAccess([ADMIN_USERS, MODIFY_USERS]), editUserForm);
routes.post('/users/:id', isLoggedIn, checkAccess([ADMIN_USERS, MODIFY_USERS]), updateUser);
routes.get('/users/delete/:id', isLoggedIn, checkAccess([ADMIN_USERS, DELETE_USERS]), deleteUser);

export default routes