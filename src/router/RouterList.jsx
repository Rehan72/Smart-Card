import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../auth/Login";

const RouterList = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "home", element: <Home /> },
  { path: "login", element: <Login /> },
];

export default RouterList;
