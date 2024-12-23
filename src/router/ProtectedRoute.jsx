import { Navigate } from "react-router-dom";
import Layout from "../components/comonComponents/Layout";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Replace with your authentication logic

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
