const { Router } = require('express');
import homeRoutes from "./home";
import authenticationRoutes from "./authentication";
import adminRoutes from "./admin";
import workOrderRoutes from "./workOrder";

const routes = Router();

routes.use(homeRoutes)
routes.use(authenticationRoutes)
routes.use(adminRoutes)
routes.use(workOrderRoutes)

export default routes
