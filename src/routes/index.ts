const { Router } = require('express');
import homeRoutes from "./home";
import authenticationRoutes from "./authentication";
import adminRoutes from "./admin";
import workOrderRoutes from "./workOrder";
import userRoutes from "./users";
import clientRoutes from "./clients";
import configurationRoutes from "./configurations"

const routes = Router();

routes.use(adminRoutes)
routes.use(authenticationRoutes)
routes.use(clientRoutes)
routes.use(homeRoutes)
routes.use(userRoutes)
routes.use(workOrderRoutes)
routes.use(configurationRoutes)

export default routes
