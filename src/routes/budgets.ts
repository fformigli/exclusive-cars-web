import { Router } from "express";
import { checkAccess, isLoggedIn } from "../lib/auth";
import { PERMISSIONS } from "../lib/constants/permissions";
import {
  addBudgetDetail,
  budgetFeedback,
  createNewBudget,
  deleteBudgetDetail, getBudget,
  getBudgetsList
} from "../controllers/budgets";

const {
  ADMIN_BUDGETS,
  MODIFY_BUDGETS,
  DELETE_BUDGETS,
  CREATE_BUDGETS,
  LIST_BUDGETS
} = PERMISSIONS

const routes = Router()

routes.post('/budgets/:budgetId/detail', checkAccess([ADMIN_BUDGETS, MODIFY_BUDGETS]), isLoggedIn, addBudgetDetail);
routes.post('/budgets/:workOrderId/add', checkAccess([ADMIN_BUDGETS, CREATE_BUDGETS]), isLoggedIn, createNewBudget);
routes.get('/budgets/detail/:id/delete', isLoggedIn, checkAccess([ADMIN_BUDGETS, DELETE_BUDGETS]), deleteBudgetDetail);
routes.get(`/budgets/feedback/:id/:feedback`, isLoggedIn, checkAccess([ADMIN_BUDGETS, MODIFY_BUDGETS]), budgetFeedback);
routes.get(`/budgets`, isLoggedIn, checkAccess([ADMIN_BUDGETS, LIST_BUDGETS]), getBudgetsList);
routes.get('/budgets/:budgetId', checkAccess([ADMIN_BUDGETS, MODIFY_BUDGETS]), isLoggedIn, getBudget);
export default routes