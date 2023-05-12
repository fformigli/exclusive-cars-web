import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { configurations } from "../controllers/configurations";

const routes = Router();

routes.get('/configurations', isLoggedIn, configurations);

export default routes