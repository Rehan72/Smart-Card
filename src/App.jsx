import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/comonComponents/Layout";
import { ThemeProvider } from "./context/Theme-Provider";
import AppRoutes from "./router/AppRoutes";
import Master from "./router/Master";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      
        <Master/>
      
    </ThemeProvider>
  );
};

export default App;
