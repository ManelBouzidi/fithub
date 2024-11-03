import axios from 'axios';

const API_URL = 'http://localhost:3000/user'; // Adjust this to match your backend URL

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      console.log("🚀 ~ signIn ~ response.data:", response.data)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userid', response.data.user || '');
      localStorage.setItem('userRole', response.data.userRole || '');
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

export const signUp = async (name, lastName, email, password,role) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, lastName, email, password,role });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userid', response.data.user.id);
      localStorage.setItem('userRole', response.data.user.role);
      return { success: true };
    }
    return { success: false, error: 'Failed to sign up' };
  } catch (error) {
    console.error('Sign up error:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'An error occurred during sign up'
    };
  }
};

export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userid');
  localStorage.removeItem('userRole');
};

export const getCurrentUser = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userid');
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const isAdmin = () => {
  return localStorage.getItem('userRole') === 'admin';
};

// Add a new function to get the authentication header
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
