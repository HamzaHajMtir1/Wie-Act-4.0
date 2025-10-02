// Simple exports for your existing APIs only

// Article functions
export { fetchAllArticles } from './fetchers/article';
export { createArticle } from './posters/article';
export { updateArticle } from './puters/article';
export { deleteArticle } from './deleters/article';

// User functions  
export { fetchAllUsers } from './fetchers/user';
export { signupUser, loginUser } from './posters/user';