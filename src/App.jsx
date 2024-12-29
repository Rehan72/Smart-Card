import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthPageLayout from "./auth/AuthPageLayout";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import { ThemeProvider } from "./context/Theme-Provider";
import Master from "./router/Master";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    
      <ThemeProvider defaultTheme="light">
        <Toaster position="top-center" reverseOrder={false} />
        <Router hashType="noslash">
          <Routes>
          <Route path="/" element={<AuthPageLayout form={<LoginForm />} />} />
            <Route path="/signup" element={<AuthPageLayout form={<SignUpForm />} />} />
            <Route path="/*" element={<Master />} />
          </Routes>
        </Router>
      </ThemeProvider>
   
  );
};

export default App;
