import Login from "../auth/LoginForm";
import AddNewAddress from "../components/commonComponents/AddNewAddress";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import AddUser from "../pages/users/AddUser";
import User from "../pages/users/User";

const RouterList = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "user", element: <User /> },
  { path: "user/add-user", element: <AddUser /> },
  { path: "home", element: <Home /> },
  { path: "dashboard/new-card", element: <AddNewAddress /> },
  { path: "login", element: <Login /> },
];

export default RouterList;
