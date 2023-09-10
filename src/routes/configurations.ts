import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import {
  configurations,
  createConfiguration,
  createConfigurationForm,
  deleteConfiguration, editConfigurationForm, updateConfiguration
} from "../controllers/configurations";

const routes = Router();

routes.get('/configurations', isLoggedIn, configurations);
routes.get('/configurations/add', isLoggedIn, createConfigurationForm);
routes.post('/configurations', isLoggedIn, createConfiguration);
routes.post('/configurations/:id', isLoggedIn, updateConfiguration);
routes.get('/configurations/delete/:id', isLoggedIn, deleteConfiguration )
routes.get('/configurations/:id', isLoggedIn, editConfigurationForm )

export default routes