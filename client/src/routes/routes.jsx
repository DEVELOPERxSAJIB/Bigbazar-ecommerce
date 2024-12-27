import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import { commonRoutes } from "./commonRoutes";
import adminRoutes from "./adminRoutes";

const routes = createBrowserRouter([...commonRoutes, ...adminRoutes, ...publicRoutes, ...privateRoutes])

export default routes;