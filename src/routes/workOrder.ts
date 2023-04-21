import { isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { add, addComment, deleteFiles, edit, list, saveNew, saveUpdate } from "../controllers/workOrders";
import { uploads } from "../lib/multer";

const routes = Router();

routes.get('/work-orders', isLoggedIn, list);
routes.get('/work-orders/add', isLoggedIn, add);
routes.get('/work-orders/edit/:id', isLoggedIn, edit);
routes.post('/work-orders/save', isLoggedIn, uploads.single('archivos'), saveNew);
routes.post('/work-orders/save/:id', isLoggedIn, uploads.single('archivos'), saveUpdate);
routes.get('/work-orders/delete/file/:wo/:id', isLoggedIn, deleteFiles);
routes.post('/work-orders/add/comment/:wo', isLoggedIn, addComment);

export default routes