import { home } from '../controllers/home'
import { isLoggedIn } from "../lib/auth";
import { Router } from "express";

const routes = Router();

routes.get('/', isLoggedIn, home);

export default routes