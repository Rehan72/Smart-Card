import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import { preText } from "../utils/Constant";


export const routeParams = preText;




export default [
   {
     element: Dashboard,
     path: `${routeParams}dashboard`,
     //permission: RoutePermission?.PLATFORM_ADMIN,
     exact: true
   },
   {
     element: Home,
     path: `${routeParams}home`,
    // permission: RoutePermission?.SYSTEM_ADMIN,
     exact: true
   },
]