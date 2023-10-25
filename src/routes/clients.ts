import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import {
  addClientForm,
  createClient,
  deleteClient,
  editClientForm,
  listClients,
  updateClient
} from "../controllers/clients";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

const {
  ADMIN_CLIENTS,
  CREATE_CLIENTS,
  LIST_CLIENTS,
  MODIFY_CLIENTS,
  DELETE_CLIENTS
} = PERMISSIONS

// gestion de clientes
routes.get('/clients', isLoggedIn, checkAccess([ADMIN_CLIENTS, LIST_CLIENTS]), listClients);
routes.get('/clients/add', isLoggedIn, checkAccess([ADMIN_CLIENTS, CREATE_CLIENTS]), addClientForm);
routes.post('/clients', isLoggedIn, checkAccess([ADMIN_CLIENTS, CREATE_CLIENTS]), createClient);
routes.get('/clients/:id', isLoggedIn, checkAccess([ADMIN_CLIENTS, MODIFY_CLIENTS]), editClientForm);
routes.post('/clients/:id', isLoggedIn, checkAccess([ADMIN_CLIENTS, MODIFY_CLIENTS]), updateClient);
routes.get('/clients/delete/:id', isLoggedIn, checkAccess([ADMIN_CLIENTS, DELETE_CLIENTS]), deleteClient);

export default routes