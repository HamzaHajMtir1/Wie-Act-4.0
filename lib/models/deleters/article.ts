import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Simple function to delete article using your existing API
export async function deleteArticle(articleId: string) {
  try {
    const response = await axios.delete(`${API_BASE}/api/article?id=${articleId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}