import React from "react";
import { Routes, Route } from "react-router-dom";
import RouterList from "./RouterList";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {RouterList.map((route, index) => {
        const Element = route.protected
          ? <ProtectedRoute>{route.element}</ProtectedRoute>
          : route.element;

        return <Route key={index} path={route.path} element={Element} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
