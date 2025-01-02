

import { postRequest, putRequest } from '../services/shared/AxioBaseService';

// Function to log in the user
export const loginUser = async (username, password) => {
  try {
    const data = { username, password };
    const response = await postRequest('/login', data);
    return response; // Returns the user data or token
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await postRequest('/register', userData);
    return response; // Returns user data or success message
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
};

// Function to fetch user data
export const getUserData = async (body) => {
   
  try {
    const response = await postRequest('search',body);
    return response.data; // Returns user details
  } catch (error) {
    throw new Error('Error fetching user data.');
  }
};

// Function to update user data
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await putRequest(`/users/${userId}`, updatedData);
    return response; // Returns updated user data
  } catch (error) {
    throw new Error('Error updating user data.');
  }
};
