import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to signup user using your existing API
export async function signupUser(userData: {
  name?: string;
  email: string;
  password: string;
  role?: string;
}) {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
}

// Simple function to login user using your existing API
export async function loginUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(`${API_BASE}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}