import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login";
import { ThemeProvider } from "./context/Theme-Provider";
import Master from "./router/Master";

const App = () => {
  return (
    
      <ThemeProvider defaultTheme="light">
        <Router hashType="noslash">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/*" element={<Master />} />
          </Routes>
        </Router>
      </ThemeProvider>
   
  );
};

export default App;
