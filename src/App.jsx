import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login";
import ErrorBoundary from "./ErrorBoundary";
import Master from "./router/Master";

const App = () => {
  return (
   // <ErrorBoundary>
   //  <ThemeProvider defaultTheme="dark">
      
   //      <Master/>
      
   //  </ThemeProvider>
   //  </ErrorBoundary> 
   <ErrorBoundary>
          <Router hashType="noslash">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/*" element={<Master />} />
            </Routes>
          </Router>
        </ErrorBoundary>
  );
};

export default App;
