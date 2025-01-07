import AddNewCard from "../pages/card/AddNewCard";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import AddUser from "../pages/users/AddUser";
import User from "../pages/users/User";
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
      element: User,
      path: `${routeParams}user`,
     // permission: RoutePermission?.SYSTEM_ADMIN,
      exact: true
    },
    {
      element: AddUser,
      path: `${routeParams}user/add-user`,
     // permission: RoutePermission?.SYSTEM_ADMIN,
      exact: true
    },
   {
     element: Home,
     path: `${routeParams}home`,
    // permission: RoutePermission?.SYSTEM_ADMIN,
     exact: true
   },
   {
      element: AddNewCard,
      path: `${routeParams}dashboard/new-card`,
     // permission: RoutePermission?.SYSTEM_ADMIN,
      exact: true
    },
]