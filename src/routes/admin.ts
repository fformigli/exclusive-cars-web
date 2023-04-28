import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { admin, editUser, updateUser, users, deleteUser } from "../controllers/admin";
import { userForm, createUser } from "../controllers/admin";

const routes = Router();

routes.get('/admin', isLoggedIn, admin);

// gestion de usuarios
routes.get('/admin/users', isLoggedIn, users);
routes.get('/admin/users/add', isLoggedIn, userForm);
routes.post('/admin/users', isLoggedIn, createUser);
routes.get('/admin/users/:id', isLoggedIn, editUser);
routes.post('/admin/users/:id', isLoggedIn, updateUser);
routes.get('/admin/users/delete/:id', isLoggedIn, deleteUser);
export default routes