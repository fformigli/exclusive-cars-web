import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { editUserForm, updateUser, users, deleteUser, userForm, createUser } from "../controllers/users";

const routes = Router();

// gestion de usuarios
routes.get('/users', isLoggedIn, users);
routes.get('/users/add', isLoggedIn, userForm);
routes.post('/users', isLoggedIn, createUser);
routes.get('/users/:id', isLoggedIn, editUserForm);
routes.post('/users/:id', isLoggedIn, updateUser);
routes.get('/users/delete/:id', isLoggedIn, deleteUser);

export default routes