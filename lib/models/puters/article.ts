import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to update article using your existing API
export async function updateArticle(updateData: {
  id: string;
  title?: string;
  content?: string;
  imageBase64?: string;
  price?: number;
  discount?: number;
  popularity?: boolean;
}) {
  try {
    const response = await axios.put(`${API_BASE}/api/article`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
}