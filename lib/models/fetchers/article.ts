import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to fetch all articles from your existing API
export async function fetchAllArticles() {
  try {
    const response = await axios.get(`${API_BASE}/api/article`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}