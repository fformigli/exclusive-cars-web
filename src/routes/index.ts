const { Router } = require('express');
import homeRoutes from "./home";
import authenticationRoutes from "./authentication";
import adminRoutes from "./admin";
import workOrderRoutes from "./workOrder";
import userRoutes from "./users";
import clientRoutes from "./clients";
import configurationRoutes from "./configurations"
import roleRoutes from "./roles"
import budgetRoutes from "./budgets"
import supplierRoutes from "./suppliers"
import invoiceRoutes from "./invoices"

const routes = Router();

routes.use(adminRoutes)
routes.use(authenticationRoutes)
routes.use(clientRoutes)
routes.use(homeRoutes)
routes.use(userRoutes)
routes.use(workOrderRoutes)
routes.use(configurationRoutes)
routes.use(roleRoutes)
routes.use(budgetRoutes)
routes.use(supplierRoutes)
routes.use(invoiceRoutes)

export default routes
