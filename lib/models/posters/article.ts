import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to create article using your existing API
export async function createArticle(articleData: {
  title: string;
  content: string;
  imageBase64?: string;
  price: number;
  discount?: number;
  popularity?: boolean;
}) {
  try {
    const response = await axios.post(`${API_BASE}/api/article`, articleData);
    return response.data;
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
}