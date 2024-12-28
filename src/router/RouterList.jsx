import Login from "../auth/LoginForm";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

const RouterList = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
];

export default RouterList;
