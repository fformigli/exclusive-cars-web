import { forbidden, logout, profile, signInGet, signInPost } from '../controllers/authentication'
import { isLoggedIn, isNotLoggedIn } from "../lib/auth";
import { Router } from "express";

const routes = Router();

routes.get('/signIn', isNotLoggedIn, signInGet);
routes.post('/signIn', isNotLoggedIn, signInPost);
routes.get('/profile', isLoggedIn, profile);
routes.get('/forbidden', isLoggedIn, forbidden);
routes.get('/logout', isLoggedIn, logout);

export default routes