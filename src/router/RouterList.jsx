import Login from "../auth/LoginForm";
import AddNewAddress from "../components/commonComponents/AddNewAddress";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import User from "../pages/User";

const RouterList = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "user", element: <User /> },
  { path: "home", element: <Home /> },
  { path: "dashboard/new-card", element: <AddNewAddress /> },
  { path: "login", element: <Login /> },
];

export default RouterList;
