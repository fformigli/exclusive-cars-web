import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import {
  addClientForm,
  createClient,
  deleteClient,
  editClientForm,
  listClients,
  updateClient
} from "../controllers/clients";

const routes = Router();

// gestion de clientes
routes.get('/clients', isLoggedIn, listClients);
routes.get('/clients/add', isLoggedIn, addClientForm);
routes.post('/clients', isLoggedIn, createClient);
routes.get('/clients/:id', isLoggedIn, editClientForm);
routes.post('/clients/:id', isLoggedIn, updateClient);
routes.get('/clients/delete/:id', isLoggedIn, deleteClient);

export default routes