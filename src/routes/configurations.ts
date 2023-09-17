import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import {
  configurations,
  createConfiguration,
  createConfigurationForm,
  deleteConfiguration, editConfigurationForm, updateConfiguration
} from "../controllers/configurations";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

const {
  ADMIN_CONFIGURATIONS,
  LIST_CONFIGURATIONS,
  CREATE_CONFIGURATIONS,
  MODIFY_CONFIGURATIONS,
  DELETE_CONFIGURATIONS
} = PERMISSIONS

routes.get('/configurations', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, LIST_CONFIGURATIONS]), configurations);
routes.get('/configurations/add', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, CREATE_CONFIGURATIONS]), createConfigurationForm);
routes.post('/configurations', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, CREATE_CONFIGURATIONS]), createConfiguration);
routes.post('/configurations/:id', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, MODIFY_CONFIGURATIONS]), updateConfiguration);
routes.get('/configurations/delete/:id', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, DELETE_CONFIGURATIONS]), deleteConfiguration);
routes.get('/configurations/:id', isLoggedIn, checkAccess([ADMIN_CONFIGURATIONS, MODIFY_CONFIGURATIONS]), editConfigurationForm);

export default routes