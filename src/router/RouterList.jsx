import Login from "../auth/LoginForm";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import User from "../pages/User";

const RouterList = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "home", element: <User /> },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
];

export default RouterList;
