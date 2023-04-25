import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { admin, users, usersDelete } from "../controllers/admin";
import { signUpGet, signUpPost } from "../controllers/admin";

const routes = Router();

routes.get('/admin', isLoggedIn, admin);
routes.get('/admin/users', isLoggedIn, users);
routes.get('/admin/users/delete/:id', isLoggedIn, usersDelete);
routes.get('/admin/users/add', isLoggedIn, signUpGet);
routes.post('/admin/users', isLoggedIn, signUpPost);
export default routes