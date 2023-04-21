import { forbidden, logout, profile, signInGet, signInPost, signUpGet, signUpPost } from '../controllers/authentication'
import { isAdmin, isLoggedIn, isNotLoggedIn } from "../lib/auth";
import { Router } from "express";

const routes = Router();

routes.get('/signup', isLoggedIn, isAdmin, signUpGet);
routes.post('/signup', isLoggedIn, isAdmin, signUpPost);
routes.get('/signIn', isNotLoggedIn, signInGet);
routes.post('/signIn', isNotLoggedIn, signInPost);
routes.get('/profile', isLoggedIn, profile);
routes.get('/forbidden', isLoggedIn, forbidden);
routes.get('/logout', isLoggedIn, logout);

export default routes