import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
// import { uploads } from "../lib/multer";
import {createWorkOrderForm, list} from "../controllers/workOrders";

const routes = Router();

routes.get('/work-orders', isLoggedIn, list);
routes.get('/work-orders/add', isLoggedIn, createWorkOrderForm);
// routes.post('/work-orders/save', isLoggedIn, uploads.single('archivos'), saveNew);
// routes.get('/work-orders/edit/:id', isLoggedIn, edit);
// routes.post('/work-orders/save/:id', isLoggedIn, uploads.single('archivos'), saveUpdate);
// routes.get('/work-orders/delete/file/:wo/:id', isLoggedIn, deleteFiles);
// routes.post('/work-orders/add/comment/:wo', isLoggedIn, addComment);

export default routes