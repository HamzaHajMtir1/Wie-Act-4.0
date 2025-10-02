import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to fetch all users from your existing API
export async function fetchAllUsers() {
  try {
    const response = await axios.get(`${API_BASE}/api/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}