import { checkAccess, isLoggedIn } from "../lib/auth";
import { Router } from "express";
import { uploads } from "../lib/multer";
import { createWorkOrder, createWorkOrderForm, editWorkOrderForm, list } from "../controllers/workOrders";
import { PERMISSIONS } from "../lib/constants/permissions";

const routes = Router();

const {
  ADMIN_WORK_ORDERS,
  LIST_WORK_ORDERS,
  CREATE_WORK_ORDERS,
  MODIFY_WORK_ORDERS,
  DELETE_WORK_ORDERS
} = PERMISSIONS

routes.get('/work-orders', isLoggedIn, checkAccess([ADMIN_WORK_ORDERS, LIST_WORK_ORDERS]), list);
routes.get('/work-orders/add', isLoggedIn, checkAccess([ADMIN_WORK_ORDERS, CREATE_WORK_ORDERS]), createWorkOrderForm);
routes.post('/work-orders', isLoggedIn, checkAccess([ADMIN_WORK_ORDERS, CREATE_WORK_ORDERS]), uploads.single('archivos'), createWorkOrder);
routes.get('/work-orders/edit/:id', isLoggedIn, checkAccess([ADMIN_WORK_ORDERS, MODIFY_WORK_ORDERS]), editWorkOrderForm);
// routes.post('/work-orders/save/:id', isLoggedIn, checkAccess([ADMIN_WORK_ORDERS, MODIFY_WORK_ORDERS]), uploads.single('archivos'), saveUpdate);
// routes.get('/work-orders/delete/file/:wo/:id', checkAccess([ADMIN_WORK_ORDERS, DELETE_WORK_ORDERS]), isLoggedIn, deleteFiles);
// routes.post('/work-orders/add/comment/:wo', checkAccess([ADMIN_WORK_ORDERS, COMMENT_WORK_ORDERS]), isLoggedIn, addComment);

export default routes