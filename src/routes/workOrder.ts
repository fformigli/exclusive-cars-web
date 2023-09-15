import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { uploads } from "../lib/multer";
import { createWorkOrder, createWorkOrderForm, editWorkOrderForm, list } from "../controllers/workOrders";

const routes = Router();

routes.get('/work-orders', isLoggedIn, list);
routes.get('/work-orders/add', isLoggedIn, createWorkOrderForm);
routes.post('/work-orders', isLoggedIn, uploads.single('archivos'), createWorkOrder);
routes.get('/work-orders/edit/:id', isLoggedIn, editWorkOrderForm);
// routes.post('/work-orders/save/:id', isLoggedIn, uploads.single('archivos'), saveUpdate);
// routes.get('/work-orders/delete/file/:wo/:id', isLoggedIn, deleteFiles);
// routes.post('/work-orders/add/comment/:wo', isLoggedIn, addComment);

export default routes