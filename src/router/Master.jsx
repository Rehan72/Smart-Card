import {
    createBrowserRouter,
    Navigate,
    RouterProvider
 } from "react-router-dom";
 import Login from "../auth/Login";
 import Layout from "../components/comonComponents/Layout";
 import { useEffect } from "react";

 import Dashboard from "../pages/Dashboard";
 import ErrorBoundary from "../pages/ErrorBoundary";
 import Home from "../pages/Home";

 
 const Master = () => {
   //const { isAuthenticated } = useAuth();
   const isAuthenticated = true; // Replace with your authentication logic
 
   
   useEffect(() => {
     // if (isAuthenticated) {
     //    console.log(isAuthenticated,"Is");
     //   navigate("/dashboard"); // Navigate to dashboard if authenticated
     // }
   }, [isAuthenticated]);
 
   const router = createBrowserRouter([
     {
       path: "/",
       element: <Login />,
     },
     
     {
       path: "/",
       element: isAuthenticated ? <Layout /> : <Login />,
       children: [
         {
           path: "dashboard",
           element: <Dashboard />,
         },
         
           {
             path: "/home",
             element: <Home />,
           },
          
          
         {
           path: "*",
           element: <ErrorBoundary />,
         },
       ],
     },
   ]);
 
 
   return <RouterProvider router={router} />;
 
 
 };
 
 export default Master;
 
 
 