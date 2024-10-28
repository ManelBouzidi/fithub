import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // Adjust this to match your backend URL

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    console.error('Sign in error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'An error occurred during sign in'
    };
  }
};

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Sign up error:', error);
    return false;
  }
};

export const signOut = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
