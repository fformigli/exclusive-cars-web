import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { admin } from "../controllers/admin";

const routes = Router();

routes.get('/admin', isLoggedIn, admin);

export default routes