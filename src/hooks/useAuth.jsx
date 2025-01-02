import axios from "axios";
import { useEffect, useState } from "react";
import LocalStorageService from "../services/shared/LocalStorageService";

export const useAuth = () => {
  const [user] = useState(null); // Store user info
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Check if the user is already authenticated when the app loads
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (...userDetails) => {
   const body = {
      itsId: 1,
    };
    try {
         const response = await axios.post('http://10.0.5.64:8098/um/api/v1/authenticate/its-token',body);
         
         
         const token = response.data.data.token;  // Assuming the response contains { token: 'value' }
        console.log(token,"Token");
        setLoading(true);
    setIsAuthenticated(true);
    console.log(userDetails);
    setLoading(false);
         if (token) {
           // Store token in local storage for future requests
           LocalStorageService.set("token", token);
         }
     
         return token;
       } catch (error) {
         console.error("Error fetching token:", error);
         throw error;
       }
    
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("token")
    setIsAuthenticated(false);
  };

  const createUser = async (...userDetails) => {
   console.log(userDetails);
   
 };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    createUser
  };
};
